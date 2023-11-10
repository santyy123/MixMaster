import React from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';
import { QueryClient, useQuery } from '@tanstack/react-query';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';


const searchCocktailsQuery = (searchTerm)=>{
  return {
    queryKey:['search',searchTerm || 'all'],
    queryFn:async()=>{
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`)
      return response.data.drinks
    }
  }
}
// react query

export const loader = (queryClient)=> 
async({request}) =>{
  const url = new URL(request.url)
  // prefetching functionality
  const searchTerm = url.searchParams.get('search') || '';
  // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`)
  await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm))
  // ensureQueryData - checking if the method is cache or not
  return {
    // drinks:response.data.drinks,
    searchTerm
  }
}

// loaders are not hooks
const Landing = () => {
  const {searchTerm} = useLoaderData()
  const {data:drinks} = useQuery(searchCocktailsQuery(searchTerm))
  console.log(drinks)
  // no need to setup useEffect()
  // trying to get drinks from useQuery

  return (
    <>
    <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks = {drinks} />    
    </>
  )
}

export default Landing
