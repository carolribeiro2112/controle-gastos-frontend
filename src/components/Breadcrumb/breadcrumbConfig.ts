export interface RouteConfig {
  label: string;
  parent?: string;
  icon?: string;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

// Configuração centralizada de rotas para breadcrumbs
export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  "/dashboard": { 
    label: "Dashboard", 
  },
  "/settings": { 
    label: "Configurações", 
    parent: "/dashboard" 
  },
  "/transactions": { 
    label: "Transações", 
    parent: "/dashboard" 
  },
};

/**
 * Gera os breadcrumbs baseado no pathname atual
 * @param pathname - O pathname atual da URL
 * @returns Array de BreadcrumbItems
 */
export const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Função recursiva para construir o caminho de breadcrumbs
  const buildPath = (path: string) => {
    const config = ROUTE_CONFIG[path];
    if (!config) return;
    
    // Se tem um pai, adiciona o pai primeiro
    if (config.parent) {
      buildPath(config.parent);
    }
    
    breadcrumbs.push({
      label: config.label,
      path: path,
      isActive: path === pathname,
    });
  };
  
  buildPath(pathname);
  return breadcrumbs;
};

/**
 * Adiciona uma nova rota à configuração de breadcrumbs
 * @param path - O caminho da rota
 * @param config - A configuração da rota
 */
export const addRouteConfig = (path: string, config: RouteConfig) => {
  ROUTE_CONFIG[path] = config;
};