package com.example.ainative.knowledge.rag;

import com.example.ainative.ai.model.ChatModelGateway;
import com.example.ainative.knowledge.citation.Citation;
import com.example.ainative.knowledge.rag.api.RagAnswerResponse;
import com.example.ainative.knowledge.retrieve.Retriever;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RagService {

    private final Retriever retriever;
    private final ChatModelGateway chatModelGateway;

    public RagService(Retriever retriever, ChatModelGateway chatModelGateway) {
        this.retriever = retriever;
        this.chatModelGateway = chatModelGateway;
    }

    public RagAnswerResponse answer(String question) {
        var retrievedChunks = retriever.retrieve(question);
        if (retrievedChunks.isEmpty()) {
            return new RagAnswerResponse(
                "No relevant knowledge found for the question.",
                List.of(),
                "NO_KNOWLEDGE"
            );
        }

        var prompt = buildPrompt(question, retrievedChunks);
        var completion = chatModelGateway.chat(prompt);
        var citations = retrievedChunks.stream()
            .map(chunk -> new Citation(chunk.chunkId(), chunk.sourceName(), chunk.content()))
            .toList();

        return new RagAnswerResponse(completion.answer(), citations, "RAG");
    }

    private static String buildPrompt(String question, List<Retriever.RetrievedChunk> retrievedChunks) {
        var context = retrievedChunks.stream()
            .map(chunk -> "[" + chunk.sourceName() + "] " + chunk.content())
            .reduce((left, right) -> left + "\n" + right)
            .orElse("");

        return """
            You are a grounded enterprise knowledge assistant.
            Answer the user's question using only the provided context.

            Context:
            %s

            Question:
            %s
            """.formatted(context, question);
    }
}
