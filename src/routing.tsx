import {createBrowserRouter} from 'react-router-dom';
import Demo from './pages/Demo';

export const routing = createBrowserRouter([
    {
        path: '/',
        element: <Demo/>,
        id: 'Demo'
    }
])
