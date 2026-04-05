package com.example.ainative.cache;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

public interface SessionMemoryStore {

    void saveMessages(String sessionId, List<String> messages);

    List<String> getMessages(String sessionId);
}

@Component
class InMemorySessionMemoryStore implements SessionMemoryStore {

    private final ConcurrentHashMap<String, List<String>> storage = new ConcurrentHashMap<>();

    @Override
    public void saveMessages(String sessionId, List<String> messages) {
        storage.put(sessionId, List.copyOf(messages));
    }

    @Override
    public List<String> getMessages(String sessionId) {
        return storage.getOrDefault(sessionId, List.of());
    }
}
