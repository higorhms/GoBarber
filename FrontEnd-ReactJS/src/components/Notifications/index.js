import React from 'react';

import { MdNotifications } from 'react-icons/md';
import {
    Container,
    Badge,
    NotificationList,
    Scroll,
    Notification,
} from './styles';

export default function Notifications() {
    return (
        <Container>
            <Badge hasUnread>
                <MdNotifications color="#301199" size={20} />
            </Badge>

            <NotificationList>
                <Scroll>
                    <Notification unread>
                        <p>texto da notificação</p>
                        <time>2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>texto da notificação</p>
                        <time>2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>texto da notificação</p>
                        <time>2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>texto da notificação</p>
                        <time>2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>texto da notificação</p>
                        <time>2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                </Scroll>
            </NotificationList>
        </Container>
    );
}
