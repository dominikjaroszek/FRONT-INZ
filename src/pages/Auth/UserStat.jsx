import React, { useEffect, useState } from 'react';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
    ResponsiveContainer, Legend, Tooltip 
} from 'recharts';
import { Spin, Alert } from 'antd';

// Zmiana importów na te z hooków (tak jak w Profile)
import { axiosPrivate } from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import SideBarAccount from './SideBarAccount';

import styles from './UserStat.module.css';

const UserStat = () => {
  const { auth } = useAuth(); // Pobieramy autoryzację
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Resetujemy błędy przy nowym pobraniu
      setError(null); 
      
      try {
        // Używamy axiosPrivate (automatycznie dodaje token)
        const response = await axiosPrivate.get('/analytics/radar/');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Błąd pobierania danych:", err);
        setError("Nie udało się pobrać profilu kibica.");
        setLoading(false);
      }
    };

    fetchData();
    
  }, [auth]); // Zależność od [auth] tak jak w Profile

  // Funkcja pomocnicza do renderowania zawartości karty
  const renderContent = () => {
    if (loading) {
        return <Spin size="large" tip="Analizowanie Twojego stylu gry..." style={{ display: 'block', margin: '50px auto' }} />;
    }

    if (error) {
        return <Alert message="Błąd" description={error} type="error" showIcon />;
    }

    if (!data) {
        return <Alert message="Brak danych" description="Nie znaleziono danych analitycznych." type="info" showIcon />;
    }

    return (
        <div className={styles.card}>
          <h1 className={styles.title}>Twój Profil Kibica</h1>

          {/* --- WYKRES RADAROWY --- */}
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.chart_data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                
                {/* Styl Bazowy (Fioletowy) */}
                <Radar
                  name="Początek (Bazowy)"
                  dataKey="base"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
                
                {/* Styl Obecny (Zielony) */}
                <Radar
                  name="Teraz (Aktualny)"
                  dataKey="current"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                
                <Legend verticalAlign="bottom" height={36}/>
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* --- SZCZEGÓŁY --- */}
          <div className={styles.details}>
            
            <div className={styles.detailItem}>
              <span className={styles.label}>Twój Styl Bazowy:</span>
              <span className={`${styles.value} ${styles.valueBase}`}>
                {data.profile_info.base_name}
              </span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.label}>Twój Styl Aktualny:</span>
              <span className={`${styles.value} ${styles.valueCurrent}`}>
                {data.profile_info.current_name}
              </span>
            </div>
            
          </div>
        </div>
    );
  };

  return (
    <div className={styles.container}>
      
      {/* Prawdziwy Sidebar zamiast pustego diva */}
      <SideBarAccount />

      <div className={styles.mainContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default UserStat;