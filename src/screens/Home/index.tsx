import { useState } from "react";
import { Alert, FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Participant } from "../components/Participant";
import { DrawnParticipant } from "../components/DrawnParticipant";
import { WinnerBox } from "../components/WinnerBox";

import { styles } from "./styles";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [drawnParticipants, setDrawnParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');
  const [winner, setWinner] = useState<string | null>(null);

  function handleParticipantAdd() {
    if (participantName.trim() === '') {
      return Alert.alert("Nome inválido", "Por favor, insira um nome válido.");
    }

    if (participants.includes(participantName.trim())) {
      return Alert.alert("Participante já existe", "Este participante já está na lista.");
    }

    setParticipants(prev => [...prev, participantName.trim()]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prev => prev.filter(p => p !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }

  function handleDraw() {
    if (participants.length === 0) {
      return Alert.alert("Lista vazia", "Adicione participantes antes de sortear.");
    }

    const remaining = participants.filter(p => !drawnParticipants.includes(p));
    if (remaining.length === 0) {
      return Alert.alert("Todos sorteados", "Não há mais participantes para sortear.");
    }

    const selected = remaining[Math.floor(Math.random() * remaining.length)];
    setDrawnParticipants(prev => [...prev, selected]);
    setWinner(selected);
  }

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.event}>
          <Text style={styles.eventName}>Sorteio Fácil</Text>

          <Text style={styles.eventDate}>
            {capitalizeFirstLetter(new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }))}
          </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nome do participante"
              placeholderTextColor="#6B6B6B"
              onChangeText={setParticipantName}
              value={participantName}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleParticipantAdd}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          {winner && <WinnerBox name={winner} />}

          <Text style={styles.subTitle}>Participantes</Text>
          {participants.length === 0 ? (
            <Text style={styles.listEmptyText}>Nenhum participante por enquanto.</Text>
          ) : (
            <FlatList
              data={participants}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Participant
                  key={item}
                  name={item}
                  onRemove={() => handleParticipantRemove(item)}
                />
              )}
              scrollEnabled={false}
            />
          )}

          {drawnParticipants.length > 0 && (
            <>
              <Text style={styles.subTitle}>Sorteados</Text>
              <FlatList
                data={drawnParticipants}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <DrawnParticipant key={item} name={item} />
                )}
                scrollEnabled={false}
              />
            </>
          )}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.fixedDrawButton} onPress={handleDraw}>
        <Text style={styles.buttonText}>Sortear participante</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
