import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect, useState } from 'react';
import storage from '@/utils/storage';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [uuid, setUID] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarUID = async () => {
      try {
        const uid = await storage.getItem('uuid');
        if (uid) {
          setUID(uid);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    buscarUID();
  }, []);

  if (loading) {
    return null; // Você pode mostrar um indicador de carregamento aqui, se desejar
  }

  return (
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      
        
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="notas"
            options={{
              title: 'Notas',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'albums' : 'albums-outline'} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="faltas"
            options={{
              title: 'Faltas',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'alert' : 'alert-outline'} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Perfil',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="historico"
            options={{
              title: 'Histórico',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'file-tray' : 'file-tray-outline'} color={color} />
              ),
            }}
          />    
       
    </Tabs>
  );
}
