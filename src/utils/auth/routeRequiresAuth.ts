import { routes } from '../../settings/routes';

export const routeRequiresAuth = (route: string) => {
    if (!route) return false;
    return !!routes.find(item => item.auth === true && item.path === route);
}
