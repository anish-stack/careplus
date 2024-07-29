import Navbar from '@/components/ui/Navbar'
import Doctors from '@/custom/Doctors'
import Services from '@/custom/Services'
import Sliders from '@/custom/Sliders'
import React, { useEffect, useState } from 'react'
import CarasoulPartner from '../Partner/CarasoulPartner'

const Landing = () => {


  const [homePage, setHomePage] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('CarePlusUserToken')) {

      setHomePage(true)
    }
  }, [localStorage.getItem('CarePlusUserToken')])
  return (
    <div>
      {homePage ? null : <Navbar />}

      <Sliders />
      <Doctors id="doctors" />
      <Services />
      <CarasoulPartner/>
    </div>
  )
}

export default Landing