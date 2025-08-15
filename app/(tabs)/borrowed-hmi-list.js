import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, Button } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

import HmiCard from '../../components/HmiCard'; // 使用 HmiCard
import { fetchBorrowedHmiList } from '../../helpers/device'; // 使用 fetchBorrowedHmiList
import { theme } from '../../theme/theme'; // 假設您的主題檔

export default function BorrowedHmiListScreen() {
  const [originalData, setOriginalData] = useState([]); // 存放從 API 獲取的完整資料
  const [filteredData, setFilteredData] = useState([]); // 存放搜尋過濾後的資料
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // 封裝資料獲取邏輯
  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchBorrowedHmiList() // <--- 改為呼叫 fetchBorrowedHmiList
      .then((list) => {
        setOriginalData(list);
        setFilteredData(list);
        setSearch('');
      })
      .catch((err) => {
        console.error("Failed to fetch Borrowed HMI list:", err);
        setError("無法載入已借出列表，請稍後再試。");
      })
      .finally(() => setLoading(false));
  }, []);

  // 使用 useFocusEffect，讓每次進入此分頁時都重新載入資料
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  // 客戶端搜尋邏輯
  useEffect(() => {
    if (search === '') {
      setFilteredData(originalData);
    } else {
      const lower = search.toLowerCase();
      // 搜尋邏輯可能需要調整，例如加入借用人 (borrower)
      const filtered = originalData.filter((item) =>
        (item.serialNumber?.toLowerCase().includes(lower)) ||
        (item.modelName?.toLowerCase().includes(lower)) ||
        (item.borrower?.name.toLowerCase().includes(lower)) // 假設資料有 borrower 欄位
      );
      setFilteredData(filtered);
    }
  }, [search, originalData]);


  const handleCardPress = (device) => {
    router.push({
      pathname: "/hmi-detail", // 跳轉到 hmi-detail
      params: {
        device: JSON.stringify(device),
      },
    });
  };

  // 渲染主體內容
  const renderContent = () => {
    // 初始載入畫面
    if (loading && !originalData.length) {
      return <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 50 }} />;
    }

    // 錯誤畫面
    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="重試" onPress={loadData} color={theme.colors.primary} />
        </View>
      );
    }

    return (
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HmiCard device={item} onPress={() => handleCardPress(item)} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>目前沒有已借出的 HMI</Text>}
        // 下拉重新整理功能
        onRefresh={loadData}
        refreshing={loading}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="搜尋序號、型號或借用人..." // 調整提示文字
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#888"
      />
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    padding: 12,
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#f0f2f5',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    color: theme.colors.error,
    fontSize: 16,
    marginBottom: 20,
  },
});