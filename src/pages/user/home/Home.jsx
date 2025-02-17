import React from 'react'
import {  Container } from 'react-bootstrap';
import FeaturedCollection from '../../../components/user/FeaturedCollection/FeaturedCollection';
import Header from '../../../components/user/Header/Header';
import HighlightedSection from '../../../components/user/HighlightedSection/HighlightedSection';
import FeaturedCategories from '../../../components/user/FeaturedCategories/FeaturedCategories';
export default function Home() {
  return (
      <>
       <Header /> 
        <FeaturedCollection />
        <HighlightedSection />
        <FeaturedCategories />
      </>
 
 
  )
}
