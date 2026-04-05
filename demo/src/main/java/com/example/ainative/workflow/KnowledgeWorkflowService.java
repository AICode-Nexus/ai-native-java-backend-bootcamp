package com.example.ainative.workflow;

import com.example.ainative.task.KnowledgeIngestTaskConsumer;
import com.example.ainative.task.KnowledgeIngestTaskPublisher;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class KnowledgeWorkflowService {

    private static final Logger log = LoggerFactory.getLogger(KnowledgeWorkflowService.class);

    private final KnowledgeIngestTaskPublisher publisher;
    private final KnowledgeIngestTaskConsumer consumer;

    public KnowledgeWorkflowService(
        KnowledgeIngestTaskPublisher publisher,
        KnowledgeIngestTaskConsumer consumer
    ) {
        this.publisher = publisher;
        this.consumer = consumer;
    }

    public WorkflowRunResult run(String documentId) {
        var task = new KnowledgeIngestTask("task-" + UUID.randomUUID(), documentId);
        var steps = new ArrayList<WorkflowStepResult>();

        publisher.publish(task);
        steps.add(WorkflowStepResult.completed("upload", "task published"));

        for (var step : List.of("parse", "chunk", "store", "notify")) {
            var result = consumer.executeStep(step, task);
            steps.add(result);

            if (!"COMPLETED".equals(result.status())) {
                log.warn("Knowledge workflow failed at step {} for task {}", step, task.taskId());
                return new WorkflowRunResult(task.taskId(), "FAILED", List.copyOf(steps));
            }
        }

        return new WorkflowRunResult(task.taskId(), "COMPLETED", List.copyOf(steps));
    }

    public record KnowledgeIngestTask(String taskId, String documentId) {
    }

    public record WorkflowRunResult(String taskId, String status, List<WorkflowStepResult> steps) {
    }

    public record WorkflowStepResult(String step, String status, String message) {

        public static WorkflowStepResult completed(String step, String message) {
            return new WorkflowStepResult(step, "COMPLETED", message);
        }

        public static WorkflowStepResult failed(String step, String message) {
            return new WorkflowStepResult(step, "FAILED", message);
        }
    }
}
