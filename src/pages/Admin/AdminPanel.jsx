import React, { useState } from "react";
import { Tabs, Button, Checkbox, Card, Typography, message } from "antd";
import { 
  PlayCircleOutlined, 
  CloudDownloadOutlined, 
  CalculatorOutlined,
  LogoutOutlined // 1. Import Icon
} from "@ant-design/icons";
import { axiosPrivate } from "../../hooks/useAxiosPrivate";
import useLogout from "../Auth/useLogout.jsx"; 
import styles from "./AdminPanel.module.css";

const { TabPane } = Tabs;
const { Title } = Typography;

const AdminPanel = () => {
  const [loading, setLoading] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [syncOptions, setSyncOptions] = useState({
    setup: false,
    matches: false,
    standings: false,
    all: false,
  });

  const [messageApi, contextHolder] = message.useMessage();
  
  // 3. Initialize the Logout hook
  const logout = useLogout();

  // Helper to call the API
  const runCommand = async (commandName, payload = {}) => {
    setLoading(true);
    setConsoleOutput("");
    try {
      messageApi.info(`Running ${commandName}... please wait.`);
      
      const response = await axiosPrivate.post(
        `/admin/run-command/${commandName}/`,
        payload
      );

      messageApi.success("Command finished!");
      setConsoleOutput(response.data.output || "Done (No output returned).");
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to execute command.");
      setConsoleOutput(error.response?.data?.error || "Unknown Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers ---

  const handleAnalytics = () => {
    runCommand("calculate_analytics");
  };

  const handleFetchStats = () => {
    runCommand("fetch_match_statistics");
  };

  const handleSyncSeason = () => {
    const { setup, matches, standings, all } = syncOptions;
    if (!setup && !matches && !standings && !all) {
      messageApi.warning("Please select at least one option for Sync.");
      return;
    }
    runCommand("sync_full_season", syncOptions);
  };

  // --- Render Components ---

  const AnalystTab = () => (
    <div style={{ padding: "20px" }}>
      <Title level={4}>Match Analytics</Title>
      <p>
        Calculate Hype, Aggression, and other metrics for upcoming matches (next 7 days).
      </p>
      <Button 
        type="primary" 
        icon={<CalculatorOutlined />} 
        onClick={handleAnalytics}
        loading={loading}
        size="large"
      >
        Run Analytics Calculation
      </Button>
    </div>
  );

  const DownloadTab = () => (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "30px" }}>
        <Title level={4}>Sync Full Season Data</Title>
        <p>Fetch fixtures, standings, and basic info from External API.</p>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <Checkbox 
                checked={syncOptions.all} 
                onChange={(e) => setSyncOptions({ ...syncOptions, all: e.target.checked })}
            >
                ALL (--all)
            </Checkbox>
            <Checkbox 
                checked={syncOptions.setup} 
                disabled={syncOptions.all}
                onChange={(e) => setSyncOptions({ ...syncOptions, setup: e.target.checked })}
            >
                Setup (Leagues/Teams)
            </Checkbox>
            <Checkbox 
                checked={syncOptions.matches} 
                disabled={syncOptions.all}
                onChange={(e) => setSyncOptions({ ...syncOptions, matches: e.target.checked })}
            >
                Matches (Fixtures)
            </Checkbox>
            <Checkbox 
                checked={syncOptions.standings} 
                disabled={syncOptions.all}
                onChange={(e) => setSyncOptions({ ...syncOptions, standings: e.target.checked })}
            >
                Standings
            </Checkbox>
        </div>
        <Button 
            type="primary" 
            onClick={handleSyncSeason} 
            loading={loading}
            icon={<CloudDownloadOutlined />}
        >
            Run Sync Season
        </Button>
      </div>

      <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
        <Title level={4}>Fetch Match Statistics</Title>
        <p>Download detailed statistics (shots, possession, etc.) for finished matches.</p>
        <Button 
            danger 
            onClick={handleFetchStats} 
            loading={loading}
            icon={<PlayCircleOutlined />}
        >
            Fetch Statistics
        </Button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {contextHolder}
      
      {/* 4. Update the Card to include the extra prop with the Logout button */}
      <Card 
        title="Admin Dashboard"
        extra={
            <Button 
                type="text" 
                danger 
                icon={<LogoutOutlined />} 
                onClick={logout}
            >
                Logout
            </Button>
        }
      >
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Download" key="1">
            <DownloadTab />
          </TabPane>
          <TabPane tab="Analyst" key="2">
            <AnalystTab />
          </TabPane>
        </Tabs>
      </Card>

      {/* Console Output Area */}
      {consoleOutput && (
        <Card style={{ marginTop: "20px", background: "#1e1e1e", color: "#00ff00" }} title={<span style={{color:'white'}}>System Output</span>}>
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {consoleOutput}
            </pre>
        </Card>
      )}
    </div>
  );
};

export default AdminPanel;