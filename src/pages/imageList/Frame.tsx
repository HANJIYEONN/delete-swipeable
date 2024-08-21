import {Box} from "@mui/material";
import CustomImageList from "./CustomImageList.tsx";


const Frame = () => {
  return (
      <Box sx={{display: 'flex', width:'100vw', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>

      <CustomImageList />
      </Box>
  );
}
export default Frame;