import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HeroSection from './HeroSection';
import ServiceSection from './ServiceSection';
import ServiceListings from './ServiceListings';
import ServiceDetails from './ServiceDetails';
import { apiService } from '../../services/api';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
    return () => {}; 
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchServices(selectedCategory, pageNumber, pageSize);
    }
  }, [selectedCategory, pageNumber]);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await apiService.getCategories();
      
      let categoriesData = [];
      if (Array.isArray(response)) {
        categoriesData = response;
      } else if (response?.data && Array.isArray(response.data)) {
        categoriesData = response.data;
      } else if (response?.Data && Array.isArray(response.Data)) {
        categoriesData = response.Data;
      }
      
      setCategories(categoriesData);
      
      if (categoriesData.length > 0) {
        const firstCategory = categoriesData[0];
        const categoryId = firstCategory?.ServiceMasterID || firstCategory?.id || 1;
        setSelectedCategory(categoryId);
      }
    } catch (error) {
      console.error("error fetching categories")
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchServices = async (categoryId, page, size) => {
    try {
      setServicesLoading(true);
      const response = await apiService.getServicesByCategory(categoryId, page, size);
      
      let servicesData = [];
      let totalPagesData = 1;
      
      if (Array.isArray(response)) {
        servicesData = response.map(item => {
          if (response.length > 0 && item.TotalPages) {
            totalPagesData = item.TotalPages;
          }
          const { TotalPages, ...service } = item;
          return service;
        });
      } else if (response?.data && Array.isArray(response.data)) {
        servicesData = response.data;
      } else if (response?.Data && Array.isArray(response.Data)) {
        servicesData = response.Data;
      }
      
      setServices(servicesData);
      setTotalPages(totalPagesData);
      
      if (servicesData.length > 0 && !selectedService) {
        const firstServiceId = servicesData[0]?.ServiceID;
        if (firstServiceId) {
          setSelectedService(firstServiceId);
        }
      }
    } catch (error) {
      // Handle error
    } finally {
      setServicesLoading(false);
    }
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPageNumber(1);
    setSelectedService(null);
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  return (
    <>
      <Helmet>
        <title>ORO24 Premium Services</title>
        <meta name="description" content="Explore ORO24's services." />
        {/* OG meta */}
      </Helmet>
      <main className='services'>
        <Header />
        <HeroSection />
        <ServiceSection 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <div className="services-content-wrapper">
          <ServiceListings
            services={services}
            loading={servicesLoading}
            onServiceSelect={handleServiceSelect}
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            selectedServiceId={selectedService}
          />
          <ServiceDetails
            serviceId={selectedService}
          />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Services;