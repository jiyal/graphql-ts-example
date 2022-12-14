import { buildSchema } from "graphql"
import express from "express"
import { graphqlHTTP } from "express-graphql"

//TODO 1: Create three new menu items using createMenuItem.
const menuItems: MenuItem[] = [
    { name: "Pizza", price: 9.50 },
    { name: "Cheeseburger", price: 7.99 },
];

const myMenu = {
    items: menuItems
};

const schema = buildSchema(`
    type Menu {
        items: [MenuItem]
    }

    type MenuItem {
        name: String!
        price: Float!
    }

    type Query {
        getMenu: Menu
    }

    type Mutation {
        createMenuItem(input: MenuItemInput): [MenuItem]
    }

    input MenuItemInput {
        name: String!
        price: Float!
    }
`);

type Menu = {
    items: MenuItem[]
};

type MenuItem = {
    name: string
    price: number
};

type MenuItemInput = Pick<MenuItem, "name" | "price">;

//TODO 2: Create a query that allows the user to return a list of menuitems under a given price.
const getMenu = (): Menu => myMenu;

//TODO 3: Create a mutation that allows the user to delete a menuitem from the menu.
const createMenuItem = (args: { input: MenuItemInput }): MenuItem[] => {
    const item = {
        ...args.input,
    }
    menuItems.push(item)

    return myMenu.items;
};

const root = {
    getMenu,
    createMenuItem,
};

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

const PORT = 8000;

app.listen(PORT);

console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);