package org.example.dto;

public class LearningProgressResponse {

    private Stat[] stats;
    private TimelineItem[] timeline;
    private Badge[] badges;
    private Course[] courses;
    private Platform[] platforms;
    private Goal[] goals;

    public LearningProgressResponse() {
    }

    public LearningProgressResponse(Stat[] stats, TimelineItem[] timeline, Badge[] badges,
                                    Course[] courses, Platform[] platforms, Goal[] goals) {
        this.stats = stats;
        this.timeline = timeline;
        this.badges = badges;
        this.courses = courses;
        this.platforms = platforms;
        this.goals = goals;
    }

    public Stat[] getStats() {
        return stats;
    }

    public void setStats(Stat[] stats) {
        this.stats = stats;
    }

    public TimelineItem[] getTimeline() {
        return timeline;
    }

    public void setTimeline(TimelineItem[] timeline) {
        this.timeline = timeline;
    }

    public Badge[] getBadges() {
        return badges;
    }

    public void setBadges(Badge[] badges) {
        this.badges = badges;
    }

    public Course[] getCourses() {
        return courses;
    }

    public void setCourses(Course[] courses) {
        this.courses = courses;
    }

    public Platform[] getPlatforms() {
        return platforms;
    }

    public void setPlatforms(Platform[] platforms) {
        this.platforms = platforms;
    }

    public Goal[] getGoals() {
        return goals;
    }

    public void setGoals(Goal[] goals) {
        this.goals = goals;
    }

    public static class Stat {
        private String label;
        private String value;
        private String icon;
        private String color;

        public Stat() {
        }

        public Stat(String label, String value, String icon, String color) {
            this.label = label;
            this.value = value;
            this.icon = icon;
            this.color = color;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }
    }

    public static class TimelineItem {
        private String title;
        private String date;
        private String type;

        public TimelineItem() {
        }

        public TimelineItem(String title, String date, String type) {
            this.title = title;
            this.date = date;
            this.type = type;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
    }

    public static class Badge {
        private String name;
        private boolean earned;
        private String desc;

        public Badge() {
        }

        public Badge(String name, boolean earned, String desc) {
            this.name = name;
            this.earned = earned;
            this.desc = desc;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public boolean isEarned() {
            return earned;
        }

        public void setEarned(boolean earned) {
            this.earned = earned;
        }

        public String getDesc() {
            return desc;
        }

        public void setDesc(String desc) {
            this.desc = desc;
        }
    }

    public static class Course {
        private String title;
        private String provider;
        private String type;
        private String difficulty;
        private int hours;
        private int match;
        private int progress;
        private String tag;
        private String reason;

        public Course() {
        }

        public Course(String title, String provider, String type, String difficulty,
                      int hours, int match, int progress, String tag, String reason) {
            this.title = title;
            this.provider = provider;
            this.type = type;
            this.difficulty = difficulty;
            this.hours = hours;
            this.match = match;
            this.progress = progress;
            this.tag = tag;
            this.reason = reason;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getProvider() {
            return provider;
        }

        public void setProvider(String provider) {
            this.provider = provider;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getDifficulty() {
            return difficulty;
        }

        public void setDifficulty(String difficulty) {
            this.difficulty = difficulty;
        }

        public int getHours() {
            return hours;
        }

        public void setHours(int hours) {
            this.hours = hours;
        }

        public int getMatch() {
            return match;
        }

        public void setMatch(int match) {
            this.match = match;
        }

        public int getProgress() {
            return progress;
        }

        public void setProgress(int progress) {
            this.progress = progress;
        }

        public String getTag() {
            return tag;
        }

        public void setTag(String tag) {
            this.tag = tag;
        }

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }
    }

    public static class Platform {
        private String name;
        private String type;
        private int courses;
        private String color;

        public Platform() {
        }

        public Platform(String name, String type, int courses, String color) {
            this.name = name;
            this.type = type;
            this.courses = courses;
            this.color = color;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public int getCourses() {
            return courses;
        }

        public void setCourses(int courses) {
            this.courses = courses;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }
    }

    public static class Goal {
        private String title;
        private String target;
        private int progress;
        private String status;

        public Goal() {
        }

        public Goal(String title, String target, int progress, String status) {
            this.title = title;
            this.target = target;
            this.progress = progress;
            this.status = status;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getTarget() {
            return target;
        }

        public void setTarget(String target) {
            this.target = target;
        }

        public int getProgress() {
            return progress;
        }

        public void setProgress(int progress) {
            this.progress = progress;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
