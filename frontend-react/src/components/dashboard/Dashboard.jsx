import axios, { spread } from 'axios'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosinstance'



const Dashboard = () => {
    useEffect (() => {
    const fetchProtectedData = async () => {
      try {
        const response = await  axiosInstance.get('/protected-view', {
      })
      }catch (error){
        console.error("error fetching data:" , error)
      }
    }
    fetchProtectedData();
  }, [])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard