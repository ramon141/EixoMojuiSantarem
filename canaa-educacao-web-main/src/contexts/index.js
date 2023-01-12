import React from 'react';
import { StudentProvider } from './studentsContext';
import { NotificationCustomProvider } from './NotificationContext'
import NotificationCustom from '../components/Notification/NotificationCustom';
export function Providers ({ children })  {

    return (
        <StudentProvider>
            <NotificationCustomProvider>
                {children}
                <NotificationCustom />
            </NotificationCustomProvider>
        </StudentProvider>
    )
}