import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useAtom, useAtomValue } from 'jotai';
import axios, { CancelTokenSource } from 'axios';
import Svg, { Path } from 'react-native-svg';
import {
  UsersIcon,
  ArticleIcon,
  CommentIcon,
  TodoIcon,
  SendIcon,
  RefreshIcon,
  CancelIcon,
  TrashIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  InfoCircleIcon,
  FileIcon,
} from '../components/icons';
import {
  loadingAtom,
  statusTextAtom,
  statusColorAtom,
  progressTextAtom,
  dataListAtom,
  nameInputAtom,
  emailInputAtom,
  canSubmitAtom,
  dataCountAtom,
  convertUsersToDataItems,
  convertPostsToDataItems,
  convertCommentsToDataItems,
  convertTodosToDataItems,
  type DataItem,
} from '../store/networkAtoms';
import { apiService } from '../services/api';

function NetworkDemoScreen() {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [statusText, setStatusText] = useAtom(statusTextAtom);
  const [statusColor, setStatusColor] = useAtom(statusColorAtom);
  const [progressText, setProgressText] = useAtom(progressTextAtom);
  const [dataList, setDataList] = useAtom(dataListAtom);
  const [nameInput, setNameInput] = useAtom(nameInputAtom);
  const [emailInput, setEmailInput] = useAtom(emailInputAtom);
  
  const canSubmit = useAtomValue(canSubmitAtom);
  const dataCount = useAtomValue(dataCountAtom);

  const cancelTokenRef = useRef<CancelTokenSource | null>(null);

  // 开始请求
  const startRequest = (message: string) => {
    setLoading(true);
    setStatusText(message);
    setStatusColor('#2196F3');
    setProgressText('');
    cancelTokenRef.current = axios.CancelToken.source();
  };

  // 请求成功
  const handleSuccess = (message: string = '✅ 请求成功') => {
    setLoading(false);
    setStatusText(message);
    setStatusColor('#4CAF50');
    setProgressText('');
  };

  // 请求失败
  const handleError = (error: any) => {
    setLoading(false);
    if (axios.isCancel(error)) {
      setStatusText('⚠️ 请求已取消');
      setStatusColor('#FF9800');
    } else {
      setStatusText(`❌ 请求失败: ${error.message}`);
      setStatusColor('#f44336');
    }
    setProgressText('');
  };

  // GET 请求 - 用户列表
  const fetchUsers = async () => {
    startRequest('正在获取用户列表...');
    try {
      const response = await apiService.getUsers(cancelTokenRef.current!);
      setDataList(convertUsersToDataItems(response.data));
      handleSuccess(`✅ 获取成功 (${response.data.length} 条)`);
    } catch (error) {
      handleError(error);
    }
  };

  // GET 请求 - 文章列表
  const fetchPosts = async () => {
    startRequest('正在获取文章列表...');
    try {
      const response = await apiService.getPosts(cancelTokenRef.current!);
      setDataList(convertPostsToDataItems(response.data));
      handleSuccess(`✅ 获取成功 (${response.data.length} 条)`);
    } catch (error) {
      handleError(error);
    }
  };

  // GET 请求 - 评论列表
  const fetchComments = async () => {
    startRequest('正在获取评论列表...');
    try {
      const response = await apiService.getComments(cancelTokenRef.current!);
      setDataList(convertCommentsToDataItems(response.data));
      handleSuccess(`✅ 获取成功 (${response.data.length} 条)`);
    } catch (error) {
      handleError(error);
    }
  };

  // GET 请求 - 待办事项
  const fetchTodos = async () => {
    startRequest('正在获取待办事项...');
    try {
      const response = await apiService.getTodos(cancelTokenRef.current!);
      setDataList(convertTodosToDataItems(response.data));
      handleSuccess(`✅ 获取成功 (${response.data.length} 条)`);
    } catch (error) {
      handleError(error);
    }
  };

  // POST 请求
  const submitUser = async () => {
    startRequest('正在发送数据...');
    try {
      const response = await apiService.createUser({
        name: nameInput,
        email: emailInput,
      });
      setDataList([
        {
          title: `✅ 创建成功: ${response.data.name}`,
          subtitle: response.data.email,
          detail: `ID: ${response.data.id}`,
        },
      ]);
      handleSuccess('✅ 数据发送成功');
      setNameInput('');
      setEmailInput('');
    } catch (error) {
      handleError(error);
    }
  };

  // 取消请求
  const cancelRequest = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('用户取消请求');
    }
  };

  // 清空列表
  const clearList = () => {
    setDataList([]);
    setStatusText('列表已清空');
    setStatusColor('#666');
    setProgressText('');
  };

  // 获取列表项图标
  const getItemIcon = (item: DataItem) => {
    // 根据标题内容判断类型
    if (item.title.includes('创建成功') || item.title.includes('✅')) {
      return <CheckCircleIcon color="#34C759" size={20} />;
    }
    if (item.detail.includes('User ID') || item.detail.includes('userId')) {
      return <UsersIcon color="#007AFF" size={18} />;
    }
    if (item.subtitle.includes('已完成') || item.subtitle.includes('未完成')) {
      return <TodoIcon color="#FF9500" size={18} />;
    }
    if (item.subtitle.includes('@') || item.detail.includes('@')) {
      return <CommentIcon color="#5856D6" size={18} />;
    }
    return <FileIcon color="#007AFF" size={18} />;
  };

  // 获取图标背景色
  const getIconBackground = (item: DataItem) => {
    if (item.title.includes('创建成功') || item.title.includes('✅')) {
      return '#E8F5E9';
    }
    if (item.detail.includes('User ID') || item.detail.includes('userId')) {
      return '#E3F2FD';
    }
    if (item.subtitle.includes('已完成') || item.subtitle.includes('未完成')) {
      return '#FFF3E0';
    }
    if (item.subtitle.includes('@') || item.detail.includes('@')) {
      return '#F3E5F5';
    }
    return '#E3F2FD';
  };

  // 获取状态图标
  const getStatusIcon = () => {
    if (loading) return null;
    if (statusText.includes('✅') || statusText.includes('成功')) {
      return <CheckCircleIcon color={statusColor} size={20} />;
    }
    if (statusText.includes('❌') || statusText.includes('失败')) {
      return <AlertCircleIcon color={statusColor} size={20} />;
    }
    if (statusText.includes('⚠️') || statusText.includes('取消')) {
      return <InfoCircleIcon color="#FF9800" size={20} />;
    }
    return <InfoCircleIcon color={statusColor} size={20} />;
  };

  // 渲染数据项
  const renderItem = ({ item }: { item: DataItem }) => (
    <View style={styles.listItem}>
      <View style={styles.itemIconContainer}>
        <View style={[styles.itemIcon, { backgroundColor: getIconBackground(item) }]}>
          {getItemIcon(item)}
        </View>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        {item.subtitle ? (
          <Text style={styles.itemSubtitle} numberOfLines={2}>
            {item.subtitle}
          </Text>
        ) : null}
        {item.detail ? (
          <Text style={styles.itemDetail}>{item.detail}</Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* 标题卡片 */}
        <View style={styles.headerCard}>
          <View style={styles.headerIconContainer}>
            <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
              <Path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                stroke="#007AFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
                stroke="#007AFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>网络请求示例</Text>
            <Text style={styles.subtitle}>Jotai + Axios</Text>
          </View>
        </View>

        {/* API 请求示例 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GET 请求示例</Text>
          <View style={styles.buttonGrid}>
            <TouchableOpacity
              style={[styles.button, styles.buttonBlue, loading && styles.buttonDisabled]}
              onPress={fetchUsers}
              disabled={loading}
              activeOpacity={0.7}
            >
              <UsersIcon size={20} />
              <Text style={styles.buttonText}>用户列表</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonPurple, loading && styles.buttonDisabled]}
              onPress={fetchPosts}
              disabled={loading}
              activeOpacity={0.7}
            >
              <ArticleIcon size={20} />
              <Text style={styles.buttonText}>文章列表</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonGreen, loading && styles.buttonDisabled]}
              onPress={fetchComments}
              disabled={loading}
              activeOpacity={0.7}
            >
              <CommentIcon size={20} />
              <Text style={styles.buttonText}>评论列表</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonOrange, loading && styles.buttonDisabled]}
              onPress={fetchTodos}
              disabled={loading}
              activeOpacity={0.7}
            >
              <TodoIcon size={20} />
              <Text style={styles.buttonText}>待办事项</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* POST 请求示例 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>POST 请求示例</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>用户名</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入用户名"
                placeholderTextColor="#999"
                value={nameInput}
                onChangeText={setNameInput}
                editable={!loading}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>邮箱</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入邮箱地址"
                placeholderTextColor="#999"
                value={emailInput}
                onChangeText={setEmailInput}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.submitButton,
              !canSubmit && styles.submitButtonDisabled,
            ]}
            onPress={submitUser}
            disabled={!canSubmit || loading}
            activeOpacity={0.7}
          >
            <SendIcon size={18} />
            <Text style={styles.submitButtonText}>发送数据</Text>
          </TouchableOpacity>
        </View>

        {/* 状态显示 */}
        <View style={[styles.statusContainer, { borderLeftColor: statusColor }]}>
          <View style={styles.statusRow}>
            {loading ? (
              <ActivityIndicator size="small" color={statusColor} />
            ) : (
              getStatusIcon()
            )}
            <View style={styles.statusTextContainer}>
              <Text style={[styles.statusText, { color: statusColor }]}>
                {statusText}
              </Text>
              {progressText ? (
                <Text style={styles.progressText}>{progressText}</Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* 操作按钮 */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.refreshButton, loading && styles.actionButtonDisabled]}
            onPress={fetchUsers}
            disabled={loading}
            activeOpacity={0.7}
          >
            <RefreshIcon size={16} />
            <Text style={styles.actionButtonText}>刷新</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton, !loading && styles.actionButtonDisabled]}
            onPress={cancelRequest}
            disabled={!loading}
            activeOpacity={0.7}
          >
            <CancelIcon size={16} />
            <Text style={styles.actionButtonText}>取消</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.clearButton]}
            onPress={clearList}
            activeOpacity={0.7}
          >
            <TrashIcon size={16} />
            <Text style={styles.actionButtonText}>清空</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 数据列表 */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>响应数据</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{dataCount}</Text>
          </View>
        </View>
        {dataList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Svg width={80} height={80} viewBox="0 0 24 24" fill="none">
              <Path
                d="M9 11l3 3L22 4"
                stroke="#E0E0E0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                stroke="#E0E0E0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.emptyText}>暂无数据</Text>
            <Text style={styles.emptyHint}>点击上方按钮获取数据</Text>
          </View>
        ) : (
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  // 头部卡片
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  headerIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  // 区块
  section: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  // 按钮网格
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  button: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: '1%',
    marginBottom: 10,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonBlue: {
    backgroundColor: '#007AFF',
  },
  buttonPurple: {
    backgroundColor: '#5856D6',
  },
  buttonGreen: {
    backgroundColor: '#34C759',
  },
  buttonOrange: {
    backgroundColor: '#FF9500',
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  // 输入框
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    color: '#1A1A1A',
  },
  // 提交按钮
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34C759',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  // 状态容器
  statusContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  // 操作按钮
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  refreshButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#FF9500',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonDisabled: {
    backgroundColor: '#E0E0E0',
    opacity: 0.5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  // 列表容器
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  countBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 32,
    alignItems: 'center',
  },
  countText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  // 列表项
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  itemIconContainer: {
    marginRight: 12,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1A1A1A',
    lineHeight: 20,
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    lineHeight: 18,
  },
  itemDetail: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  // 空状态
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    color: '#CCC',
  },
});

export default NetworkDemoScreen;
