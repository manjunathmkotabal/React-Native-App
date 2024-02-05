import { request, gql } from 'graphql-request'
import { HYGRAPH_MASTER_URL } from './Constants'


const getSlider = async()=>{
    const query = gql`
      query getSliders {
          sliders {
            id
            name
            image {
              url
            }
          }
        }
      
    `
    const result=await request(HYGRAPH_MASTER_URL, query)
    return result
}

const getCategories= async()=>{
  const query = gql`
  query getCategories {
    categories {
      name
      id
      icon {
        url
      }
    }
  }
`
  const result=await request(HYGRAPH_MASTER_URL, query)
  return result
}

const getBusinessLists= async()=>{
  const query = gql`
  query getBusinessLists {
    businessLists{
      adress
      about
      email
      id
      name
      category {
        name
      }
      images {
        url
      }
      contactPerson
    }
  }
  
  `
  const result=await request(HYGRAPH_MASTER_URL, query)
  return result
}

const getBusinessListsByCategory= async(category)=>{
  const query = gql`
  query getBusinessLists {
    businessLists(where: {category: {name: "`+category+`"}}) {
      adress
      about
      email
      id
      name
      category {
        name
      }
      images {
        url
      }
      contactPerson
    }
  }
  
  `
  const result=await request(HYGRAPH_MASTER_URL, query)
  return result
}

const createBooking= async(data)=>{
  const createQuery = gql`
  mutation createBooking {
    createBooking(
      data: {
        bookingStatus: Booked,
        businessList: {connect: {id: "`+data.businessId+`"}},
        time: "`+data.time+`",
        date: "`+data.date+`",
        userEmail: "`+data.userEmail+`",
        userName: "`+data.userName+`"
      }
    ) {
      id
    }
  }  
  `
  const result=await request(HYGRAPH_MASTER_URL, createQuery)
  const publishQuery = gql`
  mutation createBooking {
    publishBooking(where: {id: "`+result.createBooking.id+`"}) {
      id
    }
  } 
  `
  const _=await request(HYGRAPH_MASTER_URL, publishQuery)
  return result
}

const getUserBookings= async(userEmail)=>{
  const query = gql`
  query getUserBookings {
    bookings(orderBy: updatedAt_DESC, where: {userEmail: "`+userEmail+`"}) {
      time
      userEmail
      userName
      bookingStatus
      date
      id
      businessList {
        id
        images {
          url
        }
        name
        email
        contactPerson
        adress
        about
      }
    }
  }
  `
  const result=await request(HYGRAPH_MASTER_URL, query)
  return result
}

export default {
    getSlider,
    getCategories,
    getBusinessLists,
    getBusinessListsByCategory,
    createBooking,
    getUserBookings,
}