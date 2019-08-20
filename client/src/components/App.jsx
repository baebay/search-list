import React, { Component } from 'react';
import Cart from './Cart.jsx';
import CartDrawer from './CartDrawer.jsx';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AttachMoney from '@material-ui/icons/AttachMoney'
import Notifications from '@material-ui/icons/Notifications'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import MediaQuery from 'react-responsive';
import { createMuiTheme, MuiThemeProvider, Divider, List, ListItem} from "@material-ui/core";
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InputIcon from '@material-ui/icons/Input';
import HelpIcon from '@material-ui/icons/Help';


const host = process.env.API_HOST;
const port = process.env.API_PORT;
const uri = `http://${host}`;

const styles = {
  root: {
    flexGrow: 1,
  },
  spacer: {
    flexGrow: 1,
  },
  menuButton : {
    marginLeft : -10,
    marginRight : -10,
  },

};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0065D2"
    },
    //left secondary color unstyled so notification would stay red
    // secondary: {
    //   main: "#009AF7"
    // }
  }
});

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
  seed: 'ross'
});

class NavBar extends Component {
  constructor () {
    super();
    this.state = {
      cart: [],
      display: false,
      drawerOpen: false
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  componentDidMount () {
    document.addEventListener('addToCart', ({ detail }) => {
      axios.post(`${uri}/api/cart/items/`, detail)
      .then(() => this.getCartItems())
      .catch(console.error);
    });
    this.getCartItems();
  }

  getCartItems () {
    axios.get(`${uri}/api/cart/items`)
    .then(({ data }) => this.setState({ cart: data }))
    .catch(console.error);
  }

  setCurrentItem (id) {
    const detail = { detail: { id } };
    const event = new CustomEvent('setCurrentItem', detail);
    document.dispatchEvent(event);
  }

  toggleDisplay () {
    this.setState({ display: !this.state.display });
  }

  handleMenuToggle() {
    this.setState({drawerOpen : !(this.state.drawerOpen)})
  }

  render () {
    const {classes} = this.props;

    const responsiveCart = (
      <>
        <MediaQuery query='(max-width: 600px)'>
          <CartDrawer
            cart={this.state.cart}
            display={this.state.display}
            setCurrentItem={this.setCurrentItem}
            toggleDisplay={this.toggleDisplay}
          />
        </MediaQuery>
        <MediaQuery query='(min-width: 601px)'>
          <Cart
          cart={this.state.cart}
          display={this.state.display}
          setCurrentItem={this.setCurrentItem}
          toggleDisplay={this.toggleDisplay}
          />
        </MediaQuery>
      </>
    );

    const cartDisplay = this.state.display
    ? responsiveCart
    : null;

    return (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <div className={this.props.classes.root}>
            <AppBar position="static">
              <Toolbar>

              <MediaQuery query='(max-width: 600px)'>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.handleMenuToggle}>
                  <MenuIcon/>
                </IconButton>
              </MediaQuery>

              <MediaQuery query='(min-width: 601px)'>
                <Button className={classes.menuButton} color="inherit" size="large">
                  Login
                </Button>
                <Button className={classes.menuButton} color="inherit" size="large">
                  Deals
                </Button>
                <Button className={classes.menuButton} color="inherit" size="large">
                  Gift Cards
                </Button>
                <Button className={classes.menuButton} color="inherit" size="large">
                  Help
                </Button>
              </MediaQuery>
                <Typography className={this.props.classes.spacer}></Typography>



                <IconButton color="inherit" aria-label="Sell">
                  <AttachMoney />
                </IconButton>
                <IconButton color="inherit" aria-label="Account">
                  <AccountCircle />
                </IconButton>
                <IconButton color="inherit" aria-label="Notifications">
                  <Notifications />
                </IconButton>
                <IconButton color="inherit" aria-label="Cart" onClick={this.toggleDisplay}>
                  <Badge badgeContent={this.state.cart.length} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>

            <Drawer
              docked={false}
              open={this.state.drawerOpen}>
              {/* <IconButton
                edge="start"
                color="inherit"
                aria-label="Menu"
                onClick={this.handleMenuToggle}
                align="right">
                <MenuIcon/>
              </IconButton>
              Hello asdfasdfa sdfas dfasdf asdf asd fasdf asdf */}
             <AppBar position="static" style={{width : 200}}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.handleMenuToggle}>
                  <MenuIcon/>
                </IconButton>
              </Toolbar>
            </AppBar>
             {/* <Divider/> */}
             <List>
               <ListItem button>
                  <ListItemIcon>
                    <InputIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
               </ListItem>
               <ListItem button>

                 <ListItemIcon>
                   <AttachMoneyIcon />
                 </ListItemIcon>
                  <ListItemText primary="Deals" />
               </ListItem>
               <ListItem button>

                 <ListItemIcon>
                   <CardGiftcardIcon />
                 </ListItemIcon>
                <ListItemText primary="Gift Cards" />
               </ListItem>
               <ListItem button>
                 <ListItemIcon>
                   <HelpIcon />
                 </ListItemIcon>
                  <ListItemText primary="Help" />
               </ListItem>

             </List>
            </Drawer>




            {cartDisplay}
          </div>
        </MuiThemeProvider>
      </StylesProvider>
    );
  }
};

export default withStyles(styles)(NavBar);