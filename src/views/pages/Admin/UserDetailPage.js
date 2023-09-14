import React, { useState } from "react";
import {
  Button,
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
  const [openSettings, setOpenSettings] = useState(false);

  const toggleSettings = () => {
    setOpenSettings(!openSettings);
  };

  return (
    <MainCard>
      <div className="absolute right-12 mt-4 rounded">
        <Button
          onClick={toggleSettings}
          className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
          title="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            ></path>
          </svg>
        </Button>
        {openSettings && (
          <div className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl">
            <div className="py-2 border-b">
              <Typography className="text-gray-400 text-xs px-6 uppercase mb-1">
                Settings
              </Typography>
              <Button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  ></path>
                </svg>
                <span className="text-sm text-gray-700">Share Profile</span>
              </Button>
              <Button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  ></path>
                </svg>
                <span className="text-sm text-gray-700">Block User</span>
              </Button>
              <Button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-sm text-gray-700">More Info</span>
              </Button>
            </div>
            <div className="py-2">
              <Typography className="text-gray-400 text-xs px-6 uppercase mb-1">
                Feedback
              </Typography>
              <Button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
                <span className="text-sm text-gray-700">Report</span>
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-[250px]">
        <img
          src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
          alt="Profile Background"
          className="w-full h-full rounded-tl-lg rounded-tr-lg"
        />
      </div>
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
      <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
        <div className="flex items-center space-x-4 mt-2">
          <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
            </svg>
            <span>Connect</span>
          </Button>
          <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Message</span>
          </Button>
        </div>
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
    </MainCard>
  );
};

export default UserDetailPage;
