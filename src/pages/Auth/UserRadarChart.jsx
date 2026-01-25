import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, Typography, Spin } from 'antd';
import axios from '../../axiosInstance'; // Twój axios

const { Title, Text } = Typography;

const UserRadarChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/analytics/radar/')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Błąd pobierania wykresu:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign: 'center', padding: 50}}><Spin size="large" /></div>;
  if (!data) return <p>Brak danych analitycznych.</p>;

  return (
    <Card 
        title="Twój Profil Kibica" 
        bordered={false} 
        style={{ width: '100%', maxWidth: 500, margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
    >
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Text type="secondary">Zacząłeś jako:</Text> <strong style={{ color: '#8884d8' }}>{data.profile_info.base_name}</strong>
        <br />
        <Text type="secondary">Twój obecny styl:</Text> <strong style={{ color: '#82ca9d', fontSize: '1.2em' }}>{data.profile_info.current_name}</strong>
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.chart_data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            
            {/* Wykres BAZOWY (Szary/Fioletowy - tło) */}
            <Radar
              name="Początek"
              dataKey="base"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
            
            {/* Wykres AKTUALNY (Zielony - główny) */}
            <Radar
              name="Teraz"
              dataKey="current"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UserRadarChart;