package com.example.ainative.task;

import com.example.ainative.workflow.KnowledgeWorkflowService.KnowledgeIngestTask;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class KnowledgeIngestTaskPublisher {

    private final List<KnowledgeIngestTask> publishedTasks = new ArrayList<>();

    public void publish(KnowledgeIngestTask task) {
        publishedTasks.add(task);
    }

    public List<KnowledgeIngestTask> getPublishedTasks() {
        return List.copyOf(publishedTasks);
    }
}
