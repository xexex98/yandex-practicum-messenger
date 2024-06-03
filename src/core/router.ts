import Block from "src/core/block";
import Route from "src/core/route";

class Router {
  private _routes: Route[] = [];
  private _rootQuery: string;
  private _history: History = window.history;
  private _currentRoute: Route | null = null;

  constructor(rootQuery: string = "#app") {
    this._rootQuery = rootQuery;
  }

  public routes() {
    return this._routes;
  }
  public use(pathname: string, block: new () => Block): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this._routes.push(route);
    return this;
  }

  public start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _getRoute(pathname: string): Route | undefined {
    return this._routes.find((route) => route.match(pathname));
  }

  private _onRoute(pathname: string): void {
    const route = this._getRoute(pathname);

    if (!route) {
      this.go("/404", true);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public go(pathname: string, shh: boolean = false): void {
    if (!shh) {
      this._history.pushState({}, "", pathname);
    }
    this._onRoute(pathname);
  }

  public back(to: number = -1): void {
    this._history.go(to);
  }

  public forward(): void {
    this._history.forward();
  }
}

export default new Router();
