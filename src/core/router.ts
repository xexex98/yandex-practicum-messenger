import Block from "src/core/block";
import Route from "src/core/route";

export default class Router {
  private static __instance: Router;
  private _routes!: Route[];
  private _rootQuery!: string;
  private _history!: History;
  private _currentRoute: Route | null = null;

  constructor(rootQuery: string = "#app") {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._routes = [];
    this._history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: new () => Block): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this._routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      const pathname = (event.currentTarget as Window)?.location?.pathname;

      if (pathname) {
        this._onRoute(pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  private _getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }

  private _onRoute(pathname: string): void {
    const route = this._getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    // route.render(route, pathname);
    route.render();
  }

  go(pathname: string): void {
    this._history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this._history.back();
  }

  forward(): void {
    this._history.forward();
  }
}
