import React from "react";
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  SvgIcon,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";

const UserDetailPage = () => {
  return (
    <MainCard>
      <div className="absolute right-12 mt-4 rounded"></div>
      <div className="w-full h-[140px] bg-gray-500"></div>
      <div className="flex flex-col items-center -mt-20">
        <img
          src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg"
          alt="Profile"
          className="w-40 border-4 border-white rounded-full"
        />
        <div className="flex items-center space-x-2 mt-2">
          <Typography variant="h6">Amanda Ross</Typography>
          <span className="bg-blue-500 rounded-full p-1" title="Verified">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-100 h-2.5 w-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </span>
        </div>
        <Typography className="text-gray-700">
          Senior Software Engineer at Tailwind CSS
        </Typography>
        <Typography className="text-sm text-gray-500">New York, USA</Typography>
      </div>
      <h4 class="text-xl text-gray-900 font-bold text-left ml-2">
        Personal Info
      </h4>
      <List className="mt-2 text-gray-700">
        <ListItem className="flex border-y py-2">
          <Typography className="font-bold w-24">Full name:</Typography>
          <ListItemText primary="Amanda S. Ross" />
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Birthday:</Typography>
          <ListItemText primary="24 Jul, 1991" />
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Joined:</Typography>
          <ListItemText primary="10 Jan 2022 (25 days ago)" />
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Mobile:</Typography>
          <ListItemText primary="(123) 123-1234" />
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Email:</Typography>
          <ListItemText primary="amandaross@example.com" />
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Location:</Typography>
          <ListItemText primary="New York, US" />
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Languages:</Typography>
          <ListItemText primary="English, Spanish" />
        </ListItem>
      </List>

      <Grid container spacing={3} className="mt-4">
        <Grid item xs={12} lg={4}>
          <Card className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <CardContent>
              <div className="flex items-center justify-between">
                <Typography
                  variant="subtitle1"
                  className="font-bold text-indigo-600"
                >
                  Total Revenue
                </Typography>
                <Typography
                  variant="caption"
                  className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default"
                >
                  7 days
                </Typography>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <SvgIcon className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600">
                    <path
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </SvgIcon>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <Typography
                      variant="h6"
                      className="text-2xl 2xl:text-3xl font-bold"
                    >
                      $8,141
                    </Typography>
                    <div className="flex items-center ml-2 mb-1">
                      <SvgIcon className="w-5 h-5 text-green-500">
                        <path
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </SvgIcon>
                      <Typography
                        variant="subtitle2"
                        className="font-bold text-sm text-gray-500 ml-0.5"
                      >
                        3%
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <CardContent>
              <div className="flex items-center justify-between">
                <Typography
                  variant="subtitle1"
                  className="font-bold text-sm text-green-600"
                >
                  New Orders
                </Typography>
                <Typography
                  variant="caption"
                  className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default"
                >
                  7 days
                </Typography>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <SvgIcon className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600">
                    <path
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </SvgIcon>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <Typography
                      variant="h6"
                      className="text-2xl 2xl:text-3xl font-bold"
                    >
                      217
                    </Typography>
                    <div className="flex items-center ml-2 mb-1">
                      <SvgIcon className="w-5 h-5 text-green-500">
                        <path
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </SvgIcon>
                      <Typography
                        variant="subtitle2"
                        className="font-bold text-sm text-gray-500 ml-0.5"
                      >
                        5%
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <CardContent>
              <div className="flex items-center justify-between">
                <Typography
                  variant="subtitle1"
                  className="font-bold text-sm text-blue-600"
                >
                  New Connections
                </Typography>
                <Typography
                  variant="caption"
                  className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default"
                >
                  7 days
                </Typography>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <SvgIcon className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600">
                    <path
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </SvgIcon>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <Typography
                      variant="h6"
                      className="text-2xl 2xl:text-3xl font-bold"
                    >
                      54
                    </Typography>
                    <div className="flex items-center ml-2 mb-1">
                      <SvgIcon className="w-5 h-5 text-green-500">
                        <path
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </SvgIcon>
                      <Typography
                        variant="subtitle2"
                        className="font-bold text-sm text-gray-500 ml-0.5"
                      >
                        7%
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
        <Typography variant="h4" className="text-xl text-gray-900 font-bold">
          Activity log
        </Typography>
        <div className="relative px-4">
          <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                Profile information changed.
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                3 min ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                Connected with{" "}
                <Link href="#" className="text-blue-600 font-bold">
                  Colby Covington
                </Link>
                .
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                15 min ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                Invoice{" "}
                <Link href="#" className="text-blue-600 font-bold">
                  #4563
                </Link>{" "}
                was created.
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                57 min ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                Message received from{" "}
                <Link href="#" className="text-blue-600 font-bold">
                  Cecilia Hendric
                </Link>
                .
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                1 hour ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                New order received{" "}
                <Link href="#" className="text-blue-600 font-bold">
                  #OR9653
                </Link>
                .
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                2 hours ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                Message received from{" "}
                <Link href="#" className="text-blue-600 font-bold">
                  Jane Stillman
                </Link>
                .
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                2 hours ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}
        </div>
      </Paper>
    </MainCard>
  );
};

export default UserDetailPage;
