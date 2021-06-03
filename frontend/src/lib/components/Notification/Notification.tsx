import React, { useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import { Alert, Typography, Button } from 'antd'

import './index.scss'

const { Text } = Typography

const Notification: React.FC = () => {
    const [open, setOpen] = useState(false)

    const handleClose = (): void => {
        setOpen(false)
    }

    return (
        <div>
            <Alert
                message="Notify me when a slot opens up"
                type="info"
                onClick={() => setOpen(true)}
                showIcon
                icon={<NotificationsIcon fontSize="small" className="bell" />}
                action={<ArrowForwardIosIcon fontSize="small" className="rightIcon" />}
                className="alert"
            />
            <Dialog open={open} onClose={handleClose}>
                <div className="dialog">
                    <div className="mt">
                        <Text className="dialog_title">Turn on Notifications</Text>
                    </div>

                    <div className="pb pr pl mt-025">
                        <Text type="secondary" className="dialog_description">
                            You will get a notification for the following filters:
                        </Text>
                    </div>
                </div>

                <div className="actions">
                    <Divider />

                    <Button type="text" className="turn_on_button mt-05 mb-05">
                        Turn On
                    </Button>

                    <Divider />

                    <Button type="text" className="mt-05 mb-05">
                        Not Now
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default Notification
