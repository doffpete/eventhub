import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: 4,
      }}
    >
      <CircularProgress color="primary" size={160} />
    </Box>
  );
};

export default LoadingSpinner;
