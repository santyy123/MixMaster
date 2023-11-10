import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {About,Landing,NewsLetter,HomeLayout,Cocktail,Error,SinglePageError} from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import {loader as singleCocktailLoader} from './pages/Cocktail'
import { action as newsLetterAction } from "./pages/Newsletter";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
// react query for caching requests and to stop making continous request

// pages set up as component

// crearing client
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      // query valid for 5 minutes
      staleTime:1000 * 60 * 5,
    }
  }
});

const router = createBrowserRouter([
  {
    // deep level of nesting is possible
    path:'/', 
    element:<HomeLayout />, 
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing />,
        errorElement:<SinglePageError />,
        loader:landingLoader(queryClient)
        /*
        async({request}) =>{
          const url = new URL(request.url)
           // prefetching functionality 
           const searchTerm = url.searchParams.get('search') || '';
           // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`)
           return {
            // drinks:response.data.drinks,
            searchTerm
          }
        }
        */
      },
      {
        path:'cocktail/:id',
        errorElement:<SinglePageError />,
        loader:singleCocktailLoader(queryClient), 
        element:<Cocktail />
      },
      {
        path:'newsletter', 
        element:<NewsLetter />,
        action:newsLetterAction
      },
      {
        path:'about', 
        element:<About />
      }
    ]
  }
])


const App = () => {
  return <QueryClientProvider client ={queryClient}>
    <RouterProvider router={router} />;
  </QueryClientProvider>
};

export default App;
