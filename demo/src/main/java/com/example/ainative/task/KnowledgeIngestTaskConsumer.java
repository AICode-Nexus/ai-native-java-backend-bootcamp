package com.example.ainative.task;

import com.example.ainative.workflow.KnowledgeWorkflowService.KnowledgeIngestTask;
import com.example.ainative.workflow.KnowledgeWorkflowService.WorkflowStepResult;
import org.springframework.stereotype.Component;

@Component
public class KnowledgeIngestTaskConsumer {

    public WorkflowStepResult executeStep(String step, KnowledgeIngestTask task) {
        return WorkflowStepResult.completed(step, "processed " + task.documentId());
    }
}
