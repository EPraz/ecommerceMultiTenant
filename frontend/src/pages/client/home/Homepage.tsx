import {
  GridOn,
  Home,
  House,
  Menu,
  Notifications,
  Search,
  Sell,
  ShoppingBag,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Homepage = () => {
  const [value, setValue] = useState("one");

  const [bottomValue, setBottomValue] = useState(0);

  const handleChange = (_, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Stack gap={4} bgcolor={"#F9FBFA"} pb={"56px"}>
      <Stack bgcolor={"#fff"} py={1} gap={1}>
        {/* Navigation */}
        <Stack justifyContent={"space-between"} direction={"row"}>
          <Stack direction={"row"} alignItems={"center"}>
            <IconButton>
              <Menu />
            </IconButton>
            <Typography variant="h1" fontSize={24}>
              LOGO
            </Typography>
          </Stack>
          <Stack direction={"row"}>
            <IconButton>
              <Notifications />
            </IconButton>
            <IconButton>
              <ShoppingBagOutlined />
            </IconButton>
          </Stack>
        </Stack>
        {/* Search */}
        <Stack position={"relative"} justifyContent={"center"}>
          <Search
            color="disabled"
            sx={{ position: "absolute", zIndex: 10, pl: 1 }}
          />
          <TextField
            placeholder="Buscar productos"
            sx={{
              bgcolor: "#f5f5f5",
              border: "unset",
              "& .MuiInputBase-input": { pl: 5, py: 1.5 },
              "& .MuiInputBase-input::placeholder": { color: "#000000" },
            }}
          />
        </Stack>
      </Stack>
      {/* Categories */}
      <Stack>
        <Stack gap={2}>
          <Typography variant="h3" fontSize={22} fontWeight={600}>
            Categorias
          </Typography>
          <Stack direction={"row"} justifyContent={"space-around"}>
            <Stack justifyContent={"center"} alignItems={"center"} gap={1}>
              <Avatar sx={{ width: 60, height: 60, background: "#F2F4F7" }}>
                <Sell color="primary" />
              </Avatar>
              <Typography fontSize={12}>Electronica</Typography>
            </Stack>
            <Stack justifyContent={"center"} alignItems={"center"} gap={1}>
              <Avatar sx={{ width: 60, height: 60, background: "#F2F4F7" }}>
                <Home color="primary" />
              </Avatar>
              <Typography fontSize={12}>Hogar</Typography>
            </Stack>
            <Stack justifyContent={"center"} alignItems={"center"} gap={1}>
              <Avatar sx={{ width: 60, height: 60, background: "#F2F4F7" }}>
                <ShoppingBag color="primary" />
              </Avatar>
              <Typography fontSize={12}>Ropa</Typography>
            </Stack>
            <Stack justifyContent={"center"} alignItems={"center"} gap={1}>
              <Avatar sx={{ width: 60, height: 60, background: "#F2F4F7" }}>
                <GridOn color="primary" />
              </Avatar>
              <Typography fontSize={12}>Mas</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Tabs selector */}
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        bgcolor={"#F4F5F4"}
        borderRadius={2}
        py={0.5}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            minHeight: "unset",

            "& .MuiTab-root": {
              minHeight: "unset",
              textTransform: "none",
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .Mui-selected": {
              fontWeight: 600,
              color: "#000",
              bgcolor: "white",
              borderRadius: 2,
              border: "unset",
            },
          }}
        >
          <Tab value="one" label="Todos" />
          <Tab value="two" label="Populares" />
          <Tab value="three" label="Nuevos" />
          <Tab value="four" label="Ofertas" />
        </Tabs>{" "}
      </Stack>

      {/* Products list */}
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={2}
      >
        <Stack>
          <Stack sx={{ borderRadius: 4 }}>
            <img
              src="https://placehold.co/160"
              style={{ borderRadius: "5px 5px 0 0" }}
            />
          </Stack>
          <Stack bgcolor={"#fff"} borderRadius={"0 0 5px 5px"} p={1}>
            <Typography fontSize={16}>Camiseta</Typography>
            <Typography fontSize={20} color="primary" fontWeight={600}>
              $25.00
            </Typography>
          </Stack>
        </Stack>

        <Stack>
          <Stack sx={{ borderRadius: 4 }}>
            <img
              src="https://placehold.co/160"
              style={{ borderRadius: "5px 5px 0 0" }}
            />
          </Stack>
          <Stack bgcolor={"#fff"} borderRadius={"0 0 5px 5px"} p={1}>
            <Typography fontSize={16}>Camiseta</Typography>
            <Typography fontSize={20} color="primary" fontWeight={600}>
              $25.00
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <Stack sx={{ borderRadius: 4 }}>
            <img
              src="https://placehold.co/160"
              style={{ borderRadius: "5px 5px 0 0" }}
            />
          </Stack>
          <Stack bgcolor={"#fff"} borderRadius={"0 0 5px 5px"} p={1}>
            <Typography fontSize={16}>Camiseta</Typography>
            <Typography fontSize={20} color="primary" fontWeight={600}>
              $25.00
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <Stack sx={{ borderRadius: 4 }}>
            <img
              src="https://placehold.co/160"
              style={{ borderRadius: "5px 5px 0 0" }}
            />
          </Stack>
          <Stack bgcolor={"#fff"} borderRadius={"0 0 5px 5px"} p={1}>
            <Typography fontSize={16}>Camiseta</Typography>
            <Typography fontSize={20} color="primary" fontWeight={600}>
              $25.00
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack width={"100%"} position={"fixed"} sx={{ bottom: 0 }}>
        <BottomNavigation
          showLabels
          value={bottomValue}
          onChange={(_, newValue) => {
            setBottomValue(newValue);
          }}
        >
          <BottomNavigationAction label="Inicio" icon={<House />} />
          <BottomNavigationAction label="Categorias" icon={<GridOn />} />
          <BottomNavigationAction label="Productos" icon={<Sell />} />
          <BottomNavigationAction
            label="Carrito"
            icon={<ShoppingBagOutlined />}
          />
        </BottomNavigation>
      </Stack>
    </Stack>
  );
};

export default Homepage;
