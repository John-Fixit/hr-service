const passesPermission = (item, userData) => {
  if (item.requiresAdmin && !userData?.data?.IS_ADMINISTRATOR) return false;
  if (item.requiresHR && !userData?.data?.IS_HR) return false;
  if (item.requiresSalary && !userData?.data?.IS_SALARY) return false;
  return true;
};

const filterItems = (items, userData) =>
  items
    .filter((item) => item.enabled !== false && passesPermission(item, userData))
    .map((item) => {
      if (item.children?.length) {
        const children = filterItems(item.children, userData);
        if (!children.length) return null;
        return { ...item, children };
      }
      if (!item.route) return null;
      return item;
    })
    .filter(Boolean);

export const filterNavigationMenu = (sections, userData) =>
  sections
    .map((section) => {
      const items = filterItems(section.items, userData);
      if (!items.length) return null;
      return { ...section, items };
    })
    .filter(Boolean);

export const isRouteActive = (pathname, route) => {
  if (!route || route === "#") return false;
  const normalized = route.startsWith("/") ? route : `/${route}`;
  if (normalized === "/engage/home") {
    return pathname === normalized || pathname === "/engage/home/";
  }
  return (
    pathname === normalized ||
    pathname.startsWith(`${normalized}/`) ||
    pathname.startsWith(normalized)
  );
};

export const hasActiveChild = (pathname, item) => {
  if (item.route && isRouteActive(pathname, item.route)) return true;
  return item.children?.some((child) => hasActiveChild(pathname, child)) ?? false;
};
