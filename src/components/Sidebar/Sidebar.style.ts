import { styled } from "@stitches/react";

export const SidebarContainer = styled("aside", {
  padding: "32px",
  backgroundColor: "rgb(33,34,33)",
  borderRight: "1px solid #676c6a",
  boxSizing: "border-box",
});

export const CustomUl = styled("ul", {
  padding: 0,
  margin: "0px 32px 0px 0px",
  listStyle: "none",
});

export const CustomListItem = styled("li", {
  display: "flex",
  padding: "12px 16px",
  borderRadius: "8px",
  alignItems: "center",
  listStyle: "none",
  textDecoration: "none",
  cursor: "pointer",
  fontSize: "18px",
  width: "100%",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1dd8a646",
  },
});
