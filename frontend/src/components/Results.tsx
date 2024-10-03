import React from 'react'
import { useLocation } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Customer } from '../types/Customer'
import BypassModal from './BypassModal'
import NotesModal from './NotesModal'


const Results = () => {
    const customers: Customer[] = useLocation().state?.customers
    const [open, setOpen] = React.useState(false);
    const [currCustomer, setCurrCustomer] = React.useState<Customer>(new Customer);
    const [byPassCode, setBypassCode] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        minWidth: 500,
        maxWidth: 700,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      };

      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const openModal = (customer: Customer) => {
        setCurrCustomer(customer)
        handleOpen()
    }

    return (
        <div className="mainContainer">
            <Typography>
                Customer Vehicles
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">Customer Name</TableCell>
                        <TableCell align="right">Customer DoB</TableCell>
                        <TableCell align="right">Vehicle Make</TableCell>
                        <TableCell align="right">Vehicle Model</TableCell>
                        <TableCell align="right">Vehicle Year</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {customers.map((customer: Customer, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        onClick={() => openModal(customer)}
                        >
                        <TableCell component="th" scope="row" align="right">
                            {customer.CustomerName}
                        </TableCell>
                        <TableCell align="right">{customer.DOB}</TableCell>
                        <TableCell align="right">{customer.VehMake}</TableCell>
                        <TableCell align="right">{customer.VehModel}</TableCell>
                        <TableCell align="right">{customer.VehYear}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <Grid>
                        {currCustomer.VehYear}  {currCustomer.VehMake}       {currCustomer.VehModel}  {currCustomer.VehPlate} 
                    </Grid>
                </Typography>
                <Typography>
                <List sx={{ listStyleType: 'disc' }}>
                    <ListItem sx={{ display: 'list-item' }}> 
                        If they are unable to start the car, ask what the device says on the screen.
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}> 
                        If it’s asking for a test, make sure they hear the device beeping, indicating it’s taking a sample, when they blow into it.
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}> 
                        If they are unable to start the car, ask what the device says on the screen.                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}> 
                        If it’s asking for a test, make sure they hear the device beeping, indicating it’s taking a sample, when they blow into it.
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}> 
                        If it says “Stop Service” on the screen, then provide them a bypass code, which will only start the car one time.
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}> 
                        If they are bringing the car in for service at a mechanic, tell them to call back during regular business hours, so we may assist them to provide the mechanic with a bypass code.
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}> 
                        If they have questions about a violation, or further questions about how the device works, try to get them to call during regular business hours so we may assist them.
                    </ListItem>
                </List>
                </Typography>
                <Grid container spacing={2} alignItems="center" display= 'flex'>
                    <Grid item xs={4} sx={{ justifyContent: "flex-start" }}>
                        <NotesModal />
                    </Grid>
                    <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <BypassModal />
                    </Grid>
                </Grid>
                </Box>
            </Modal>
        </div>
  )
}


export default Results