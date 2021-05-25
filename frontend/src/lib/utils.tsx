import React from 'react'
import { toast } from 'react-toastify'
import { Spin } from 'antd'
import dayjs from 'dayjs'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export function errorToast(title?: string, message?: string, errorDetail?: string, errorCode?: string): void {
    /**
     * Shows a standardized error toast when something goes wrong. Automated for any loader usage
     * @param title Title message of the toast
     * @param message Body message on the toast
     * @param errorDetail Error response returned from the server, or any other more specific error detail
     * @param errorCode Error code from the server that can help track the error
     */

    toast.dismiss('error') // This will ensure only the last error is shown

    setTimeout(
        () =>
            toast.error(
                <div>
                    <h1>
                        <ExclamationCircleOutlined /> {title || 'Something went wrong'}
                    </h1>
                    <p>
                        {message || 'We could not complete your action. Detailed error:'}{' '}
                        <span className="error-details"> {errorDetail || 'Unknown exception.'}</span>
                    </p>
                    <p className="action-bar">
                        Please <b>try agin</b> if the error persists
                    </p>
                    <div className="action-bar">{errorCode && <span>Code: {errorCode}</span>}</div>
                </div>,
                {
                    toastId: 'error', // will ensure only one error is displayed at a time
                }
            ),
        100
    )
}

/** Convert camelCase, PascalCase or snake_case to Title Case. */
export function identifierToHuman(identifier: string | number): string {
    const words: string[] = []
    let currentWord: string = ''
    String(identifier)
        .trim()
        .split('')
        .forEach((character) => {
            if (character === '_' || character === '-') {
                if (currentWord) {
                    words.push(currentWord)
                }
                currentWord = ''
            } else if (
                character === character.toLowerCase() &&
                (!'0123456789'.includes(character) ||
                    (currentWord && '0123456789'.includes(currentWord[currentWord.length - 1])))
            ) {
                currentWord += character
            } else {
                if (currentWord) {
                    words.push(currentWord)
                }
                currentWord = character.toLowerCase()
            }
        })
    if (currentWord) {
        words.push(currentWord)
    }
    return words.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
}

export function delay(ms: number): Promise<number> {
    return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export function SceneLoading(): JSX.Element {
    return (
        <div style={{ textAlign: 'center', marginTop: '20vh' }}>
            <Spin />
        </div>
    )
}

export function humanFriendlyDate(date: string): string {
    const d = date.split('-')[0]
    const m = date.split('-')[1]
    const y = date.split('-')[2]
    const validatedDate = `${y}/${m}/${d}`

    return dayjs(validatedDate).format('MMMM DD, dddd')
}
