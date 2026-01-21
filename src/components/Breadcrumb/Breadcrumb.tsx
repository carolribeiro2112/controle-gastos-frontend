import { Flex, Text, Link } from "@radix-ui/themes";
import { ChevronRight, Home } from "lucide-react";
import { useLocation, Link as RouterLink } from "react-router";
import type { BreadcrumbItem } from "./breadcrumbConfig";
import { generateBreadcrumbs } from "./breadcrumbConfig";

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHomeIcon?: boolean;
}

const Breadcrumb = ({ items, showHomeIcon = true }: BreadcrumbProps) => {
  const location = useLocation();
  const breadcrumbItems = items || generateBreadcrumbs(location.pathname);

  if (breadcrumbItems.length === 0) {
    return null;
  }

  const isSingleActiveItem =
    breadcrumbItems.length === 1 && breadcrumbItems[0]?.isActive;
  const homeIconColor = isSingleActiveItem
    ? "var(--jade-11)"
    : "var(--gray-11)";

  return (
    <Flex
      gap="2"
      style={{
        padding: "8px 48px",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {showHomeIcon && <Home size={16} style={{ color: homeIconColor }} />}

      {breadcrumbItems.map((item, index) => (
        <Flex key={item.path} align="center" gap="2">
          {index > 0 && (
            <ChevronRight size={14} style={{ color: "var(--gray-9)" }} />
          )}

          {item.isActive ? (
            <Text size="2" weight="medium" style={{ color: "var(--jade-11)" }}>
              {item.label}
            </Text>
          ) : (
            <Link asChild>
              <RouterLink
                to={item.path}
                style={{
                  textDecoration: "none",
                  color: "var(--gray-11)",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {item.label}
              </RouterLink>
            </Link>
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default Breadcrumb;
