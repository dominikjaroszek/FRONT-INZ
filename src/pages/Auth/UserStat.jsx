import React, { useEffect, useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Legend, Tooltip 
} from 'recharts';
import { Spin, Alert } from 'antd';

import { axiosPrivate } from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import SideBarAccount from './SideBarAccount';

import styles from './UserStat.module.css';

const UserStat = () => {
  const { auth } = useAuth(); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null); 
      
      try {
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
    
  }, [auth]); 

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
                {/* Przyciemniona siatka wykresu */}
                <PolarGrid stroke="#3a414a" /> 
                {/* Zmiana koloru tekstu wokół wykresu na jasnoszary */}
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#8b949e', fontSize: 13, fontWeight: 600 }} />
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
                
                {/* Legenda dopasowana do ciemnego tła */}
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#e0e6ed' }} />
                
                {/* Tooltip w ciemnym motywie */}
                <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#16191d', 
                      borderColor: '#2a2e35', 
                      borderRadius: '8px', 
                      color: '#e0e6ed',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                    }}
                    itemStyle={{ color: '#e0e6ed', fontWeight: 600 }}
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
      <SideBarAccount />
      <div className={styles.mainContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default UserStat;