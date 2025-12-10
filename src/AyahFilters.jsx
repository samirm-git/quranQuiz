import { useState} from 'react';
import './App.css'
import * as constants from './constants';

function AyahFilters({setFilters}){
  const [isVisible, setIsVisible] = useState(false);
  
 return (
    <div className="filters">
      <button 
        className="filters-toggle"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? 'Hide Filters ▼' : 'Show Filters ▶'}
      </button>
      
      <div className={`filters-grid ${isVisible ? 'show' : ''}`}>
        <div className="filter-select">
          <label>Juz</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, juz_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.juz_ids.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-select">
          <label>Page</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, page_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.page_numbers.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-select">
          <label>Hizb</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, hizb_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.hizb_numbers.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-select">
          <label>Rub el Hizb</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, rub_el_hizb_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.rub_el_hizb_numbers.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-select">
          <label>Ruku</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, ruku_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.ruku_numbers.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-select">
          <label>Manzil</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, manzil_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.manzil_numbers.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  ) 
}

export {AyahFilters}