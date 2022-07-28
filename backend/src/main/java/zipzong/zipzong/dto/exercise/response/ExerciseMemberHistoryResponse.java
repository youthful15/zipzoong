package zipzong.zipzong.dto.exercise.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExerciseMemberHistoryResponse {
    private List<ExerciseMemberHistoryResponse.DailyHistory> dailyHistories;
    @Getter
    @Setter
    public static class DailyHistory
    {
        private int day;
        private int totalTime;
        private List<ExerciseMemberHistoryResponse.Perform> performs;
    }

    @Getter
    @Setter
    public static class Perform {
        private String performName;
        private int performNum;
        private int performTime;

        @Builder
        public Perform (String performName, int performNum, int performTime) {
            this.performName = performName;
            this.performNum = performNum;
            this.performTime = performTime;
        }
    }
}