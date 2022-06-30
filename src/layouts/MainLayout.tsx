const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      minHeight: "100vh",
    }}
  >
    {children}
  </div>
);

export default MainLayout;
