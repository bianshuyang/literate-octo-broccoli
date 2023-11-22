import React from 'react';
import Navbar from './Navbar.js';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { LabLinkContext } from '../LabLinkProvider';

export default function Profile() {

  const { netID } = React.useContext(LabLinkContext);
  const { name, setName } = React.useContext(LabLinkContext);
  const { role, setRole } = React.useContext(LabLinkContext);
  const { email, setEmail } = React.useContext(LabLinkContext);
  const { bio, setBio } = React.useContext(LabLinkContext);
  const { year, setYear } = React.useContext(LabLinkContext);
  const { major, setMajor } = React.useContext(LabLinkContext);
  const { courses, setCourses } = React.useContext(LabLinkContext);
  const [usersData, setusersData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUsersAndUpdateState();
        console.log("We have all users below");
        console.log(usersData);

        const userInfo = await getUserNameByNetId(netID);
        console.log("This is the user info you are looking for")
        console.log(userInfo);
        if (userInfo){
          console.log("updating... ")
          setName(userInfo.name || '');
          setRole(userInfo.role || '');
          setEmail(userInfo.email || '');
          setYear(userInfo.year || null);
          setMajor(userInfo.major || '');
          setCourses(userInfo.courses || '');
          setBio(userInfo.bio || '');
        }
      } catch (error) {
        // Handle errors...
        console.error("Error fetching and updating user data:", error.message);
      }
    };

    fetchData();

  });


  const getUserNameByNetId = (netId) => {
      const user = usersData.find(u => u.netId === netId);
      console.log(user);
      console.log("Above is user");
      return user;
  };

  const fetchUsersAndUpdateState = async () => {
      try {
           const response = await fetch("/api/forum?dataType=users", {
              method: "GET"
              });
          const responseDataText = await response.text();

          // Attempt to parse as JSON, if fails, just use the text
          let responseData;
          try {
              responseData = JSON.parse(responseDataText);
              console.log("OK");
              console.log(responseData);
          } catch (error) {
              console.error("Failed to parse response as JSON: ", responseDataText);
              responseData = responseDataText;
          }

          // Handle based on type
          if (typeof responseData === 'object' && response.ok) {
              setusersData(responseData);
          } else {
              console.error('Error or non-JSON response:', responseData);
          }
      } catch (error) {
          console.error('Error fetching data: ', error);
      }
  };

  async function addUser({ name, role, email, bio, netID }) {
      try {
        console.log(process.env);
          const response = await fetch("/api/forum?collection=users", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  collectionName: 'users',
                  name: name,
                  role: role,
                  email: email,
                  year: year,
                  major: major,
                  courses: courses,
                  bio: bio,
                  netId: netID,
              }),
          });
          console.log(response);
          const statusCode = response.status;
          console.log(statusCode);
          console.log("I added user ")

      } catch (error) {
          //console.error('Error during registration:', error.message);
          console.log("Something is wrong...?")
          console.log(error);
      }

  }

  const handleSave = async () => {
    try {

      await addUser({
        name: name,
        role: role,
        email: email,
        year: year,
        major: major,
        courses: courses,
        bio: bio,
        netID: netID,
      });

      alert("Profile updated successfully!");
    } catch (error) {
      // Handle errors
      console.error("Error saving profile:", error.message);
      alert("Failed to update profile. Please try again.");
    }
  };



  const handleCancel = () => {
    // Ignore changes and reset form fields to the values from LabLinkContext
    setName(prevName => prevName);
    setRole(prevRole => prevRole);
    setEmail(prevEmail => prevEmail);
    setBio(prevBio => prevBio);
    setYear(prevYear => prevYear);
    setMajor(prevMajor => prevMajor);
    setCourses(prevCourses => prevCourses);
  };


  return (
    <>
    <div className="site-mobile-menu">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close">
          <span className="icofont-close js-menu-toggle"></span>
        </div>
      </div>
      <div className="site-mobile-menu-body"></div>
    </div>

    <Navbar/>

    <div className="untree_co-hero overlay">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-12">
            <div className="row justify-content-center ">
              <div className="col-lg-6 text-center ">
                <h1 className="mb-4 heading text-white" data-aos="fade-up" data-aos-delay="100">Welcome { name ? name : netID }</h1>
                <div className="mb-5 text-white desc mx-auto" data-aos="fade-up" data-aos-delay="200">
                  <p>Welcome to the LabLink Profile Page! Here, you have the power to personalize your scientific identity. Update your email, fine-tune your display name, and enhance your professional bio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Box
      sx={{
        flex: 1,
        width: '100%',
      }}
    >
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: {
            xs: 2,
            md: 6,
          },
          py: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will apper to the networks.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: 'flex-column',
                      md: 'flex-row',
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="Preferred Name" defaultValue={name} sx={{ flexGrow: 1 }} onChange={((e) => setName(e.target.value))}/>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input size="sm" placeholder="Occupation" defaultValue={role} onChange={((e) => setRole(e.target.value))}/>
                </FormControl>
                <FormControl>
                  <FormLabel>Graduation Year</FormLabel>
                  <Input size="sm" placeholder="Year" defaultValue={year} onChange={((e) => setYear(e.target.value))}/>
                </FormControl>
                <FormControl>
                  <FormLabel>Major</FormLabel>
                  <Input size="sm" placeholder="Major" defaultValue={major} onChange={((e) => setMajor(e.target.value))}/>
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="Email"
                    defaultValue={email}
                    sx={{ flexGrow: 1 }}
                    onChange={((e) => setEmail(e.target.value))}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={1}>
                <FormLabel>Previous Courses</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: 'flex-column',
                      md: 'flex-row',
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="eg., Data Structures and Algorithms, Research in Biology..." defaultValue={courses} sx={{ flexGrow: 1 }} onChange={((e) => setCourses(e.target.value))}/>
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={108}
                  sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}
                >
                  <img
                    src=""
                    srcSet=""
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: 'background.body',
                    position: 'absolute',
                    zIndex: 2,
                    borderRadius: '50%',
                    left: 85,
                    top: 180,
                    boxShadow: 'sm',
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: 'flex-column',
                      md: 'flex-row',
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="Last name" defaultValue={name} />
                </FormControl>
              </Stack>
            </Stack>

            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input size="sm" placeholder="Occupation" defaultValue={role} />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="Email"
                defaultValue={email}
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleSave}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Bio</Typography>
            <Typography level="body-sm">
              Write a short introduction to be displayed on your profile
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <Textarea
              size="sm"
              minRows={4}
              sx={{ mt: 1.5 }}
              placeholder="Type your bio here..."
              defaultValue={bio}
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
              275 characters left
            </FormHelperText>
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleSave}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
    </>
  );
}
