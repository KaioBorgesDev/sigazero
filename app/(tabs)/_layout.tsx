import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="notas"
      options={{title: 'Notas', tabBarIcon: ({color,focused}) =>(
        <TabBarIcon name={focused ?'albums-sharp' : 'albums-outline' } color={color}></TabBarIcon>
      )}}/>

      <Tabs.Screen name="faltas"
      options={{title: 'Faltas', tabBarIcon: ({color,focused}) =>(
        <TabBarIcon name={focused ?'alert' : 'alert-outline' } color={color}></TabBarIcon>
      )}}/>
      <Tabs.Screen name="profile"
      options={{title: 'Perfil', tabBarIcon: ({color,focused}) =>(
        <TabBarIcon name={focused ?'person' : 'person-outline' } color={color}></TabBarIcon>
      )}}/>
    </Tabs>
  );
}