package com.example.ainative.workflow;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.ainative.task.KnowledgeIngestTaskConsumer;
import com.example.ainative.task.KnowledgeIngestTaskPublisher;
import org.junit.jupiter.api.Test;

class KnowledgeWorkflowServiceTest {

    @Test
    void shouldRunFixedKnowledgeWorkflow() {
        var publisher = new KnowledgeIngestTaskPublisher();
        var consumer = new KnowledgeIngestTaskConsumer();
        var service = new KnowledgeWorkflowService(publisher, consumer);

        var result = service.run("doc-123");

        assertThat(result.status()).isEqualTo("COMPLETED");
        assertThat(result.steps()).extracting(KnowledgeWorkflowService.WorkflowStepResult::step)
            .containsExactly("upload", "parse", "chunk", "store", "notify");
        assertThat(result.steps()).allMatch(step -> step.status().equals("COMPLETED"));
        assertThat(publisher.getPublishedTasks()).hasSize(1);
    }

    @Test
    void shouldExposeFailedStepWhenWorkflowBreaks() {
        var publisher = new KnowledgeIngestTaskPublisher();
        var consumer = new KnowledgeIngestTaskConsumer() {
            @Override
            public KnowledgeWorkflowService.WorkflowStepResult executeStep(
                String step,
                KnowledgeWorkflowService.KnowledgeIngestTask task
            ) {
                if ("store".equals(step)) {
                    return KnowledgeWorkflowService.WorkflowStepResult.failed(step, "storage unavailable");
                }
                return super.executeStep(step, task);
            }
        };
        var service = new KnowledgeWorkflowService(publisher, consumer);

        var result = service.run("doc-123");

        assertThat(result.status()).isEqualTo("FAILED");
        assertThat(result.steps()).extracting(KnowledgeWorkflowService.WorkflowStepResult::step)
            .containsExactly("upload", "parse", "chunk", "store");
        assertThat(result.steps().get(result.steps().size() - 1).message()).isEqualTo("storage unavailable");
    }
}
