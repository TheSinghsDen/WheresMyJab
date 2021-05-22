import { BuiltLogic, kea } from 'kea'
import { router } from 'kea-router'
import { identifierToHuman, delay } from '../lib/utils'
import { Error404 } from '../layout/Error404'
import { ErrorNetwork } from '../layout/ErrorNetwork'

import { sceneLogicType } from './sceneLogicType'

export enum Scene {
    FindSlots = 'findslots',
}

interface LoadedScene {
    component: () => JSX.Element
    logic?: BuiltLogic
}

interface Params {
    [param: string]: any
}

export const scenes: Record<Scene, () => any> = {
    [Scene.FindSlots]: () => import('./findSlots/FindSlots'),
}

export const redirects: Record<string, string | ((params: Params) => any)> = {
    '/': '/findSlots',
}

export const routes: Record<string, Scene> = {
    '/findSlots': Scene.FindSlots,
}

export const sceneLogic = kea<sceneLogicType>({
    actions: {
        loadScene: (scene: Scene, params: Params) => ({ scene, params }),
        setScene: (scene: Scene, params: Params) => ({ scene, params }),
        setLoadedScene: (scene: Scene, loadedScene: LoadedScene) => ({ scene, loadedScene }),
    },
    reducers: {
        scene: [
            null as Scene | null,
            {
                setScene: (_, payload) => payload.scene,
            },
        ],
        params: [
            {} as Params,
            {
                setScene: (_, payload) => payload.params || {},
            },
        ],
        loadedScenes: [
            {
                404: {
                    component: Error404,
                },
                '4xx': {
                    component: ErrorNetwork,
                },
            } as Record<string | number, LoadedScene>,
            {
                setLoadedScene: (state, { scene, loadedScene }) => ({ ...state, [scene]: loadedScene }),
            },
        ],
        loadingScene: [
            null as Scene | null,
            {
                loadScene: (_, { scene }) => scene,
                setScene: () => null,
            },
        ],
    },
    urlToAction: ({ actions }) => {
        const mapping: Record<string, (params: Params) => any> = {}

        for (const [paths, redirect] of Object.entries(redirects)) {
            for (const path of paths.split('|')) {
                mapping[path] = (params) =>
                    router.actions.replace(typeof redirect === 'function' ? redirect(params) : redirect)
            }
        }
        for (const [paths, scene] of Object.entries(routes)) {
            for (const path of paths.split('|')) {
                mapping[path] = (params) => actions.loadScene(scene, params)
            }
        }

        mapping['/*'] = () => actions.loadScene('404', {})

        return mapping
    },
    listeners: ({ values, actions }) => ({
        setScene: () => {
            document.title = values.scene ? `${identifierToHuman(values.scene)} • WheresMyJab` : 'WheresMyJab'
        },
        loadScene: async (
            {
                scene,
                params = {},
            }: {
                scene: Scene
                params: Params
            },
            breakpoint
        ) => {
            if (values.scene === scene) {
                actions.setScene(scene, params)
                return
            }

            if (!scenes[scene]) {
                actions.setScene('404', {})
                return
            }

            let loadedScene = values.loadedScenes[scene]

            if (!loadedScene) {
                let importedScene
                try {
                    importedScene = await scenes[scene]()
                } catch (error) {
                    if (error.name === 'ChunkLoadError') {
                        if (scene !== null) {
                            // We were on another page (not the first loaded scene)
                            console.error('App assets regenerated. Reloading this page.')
                            window.location.reload()
                            return
                        } else {
                            // First scene, show an error page
                            console.error('App assets regenerated. Showing error page.')
                            actions.setScene('4xx', {})
                        }
                    } else {
                        throw error
                    }
                }
                breakpoint()
                const { default: defaultExport, logic, ...others } = importedScene

                if (defaultExport) {
                    loadedScene = {
                        component: defaultExport,
                        logic: logic,
                    }
                } else {
                    loadedScene = {
                        component:
                            Object.keys(others).length === 1
                                ? others[Object.keys(others)[0]]
                                : values.loadedScenes['404'].component,
                        logic: logic,
                    }
                    if (Object.keys(others).length > 1) {
                        console.error('There are multiple exports for this scene. Showing 404 instead.')
                    }
                }
                actions.setLoadedScene(scene, loadedScene)
            }
            const { logic } = loadedScene

            let unmount

            if (logic) {
                // initialize the logic
                unmount = logic.build(params, false).mount()
                try {
                    await breakpoint(100)
                } catch (e) {
                    // if we change the scene while waiting these 100ms, unmount
                    unmount()
                    throw e
                }
            }

            actions.setScene(scene, params)

            if (unmount) {
                // release our hold on this logic after 0.5s as it's by then surely mounted via React
                // or we are anyway in a new scene and don't need it
                await delay(500)
                unmount()
            }
        },
    }),
})
