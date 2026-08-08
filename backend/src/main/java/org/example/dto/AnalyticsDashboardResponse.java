package org.example.dto;

public class AnalyticsDashboardResponse {

    private Kpi[] kpis;
    private TeamMember[] team;
    private DepartmentMetric[] departments;
    private TrendPoint[] gapTrend;
    private Benchmark[] benchmarks;
    private TopMover[] topMovers;

    public AnalyticsDashboardResponse() {
    }

    public AnalyticsDashboardResponse(Kpi[] kpis, TeamMember[] team, DepartmentMetric[] departments,
                                      TrendPoint[] gapTrend, Benchmark[] benchmarks, TopMover[] topMovers) {
        this.kpis = kpis;
        this.team = team;
        this.departments = departments;
        this.gapTrend = gapTrend;
        this.benchmarks = benchmarks;
        this.topMovers = topMovers;
    }

    public Kpi[] getKpis() {
        return kpis;
    }

    public void setKpis(Kpi[] kpis) {
        this.kpis = kpis;
    }

    public TeamMember[] getTeam() {
        return team;
    }

    public void setTeam(TeamMember[] team) {
        this.team = team;
    }

    public DepartmentMetric[] getDepartments() {
        return departments;
    }

    public void setDepartments(DepartmentMetric[] departments) {
        this.departments = departments;
    }

    public TrendPoint[] getGapTrend() {
        return gapTrend;
    }

    public void setGapTrend(TrendPoint[] gapTrend) {
        this.gapTrend = gapTrend;
    }

    public Benchmark[] getBenchmarks() {
        return benchmarks;
    }

    public void setBenchmarks(Benchmark[] benchmarks) {
        this.benchmarks = benchmarks;
    }

    public TopMover[] getTopMovers() {
        return topMovers;
    }

    public void setTopMovers(TopMover[] topMovers) {
        this.topMovers = topMovers;
    }

    public static class Kpi {
        private String label;
        private String value;
        private Boolean positive;
        private int seed;

        public Kpi() {
        }

        public Kpi(String label, String value, Boolean positive, int seed) {
            this.label = label;
            this.value = value;
            this.positive = positive;
            this.seed = seed;
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

        public Boolean getPositive() {
            return positive;
        }

        public void setPositive(Boolean positive) {
            this.positive = positive;
        }

        public int getSeed() {
            return seed;
        }

        public void setSeed(int seed) {
            this.seed = seed;
        }
    }

    public static class TeamMember {
        private String name;
        private String role;
        private int score;
        private int gap;
        private int trend;

        public TeamMember() {
        }

        public TeamMember(String name, String role, int score, int gap, int trend) {
            this.name = name;
            this.role = role;
            this.score = score;
            this.gap = gap;
            this.trend = trend;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public int getScore() {
            return score;
        }

        public void setScore(int score) {
            this.score = score;
        }

        public int getGap() {
            return gap;
        }

        public void setGap(int gap) {
            this.gap = gap;
        }

        public int getTrend() {
            return trend;
        }

        public void setTrend(int trend) {
            this.trend = trend;
        }
    }

    public static class DepartmentMetric {
        private String dept;
        private int completion;
        private int gap;
        private int headcount;

        public DepartmentMetric() {
        }

        public DepartmentMetric(String dept, int completion, int gap, int headcount) {
            this.dept = dept;
            this.completion = completion;
            this.gap = gap;
            this.headcount = headcount;
        }

        public String getDept() {
            return dept;
        }

        public void setDept(String dept) {
            this.dept = dept;
        }

        public int getCompletion() {
            return completion;
        }

        public void setCompletion(int completion) {
            this.completion = completion;
        }

        public int getGap() {
            return gap;
        }

        public void setGap(int gap) {
            this.gap = gap;
        }

        public int getHeadcount() {
            return headcount;
        }

        public void setHeadcount(int headcount) {
            this.headcount = headcount;
        }
    }

    public static class TrendPoint {
        private String q;
        private int gap;

        public TrendPoint() {
        }

        public TrendPoint(String q, int gap) {
            this.q = q;
            this.gap = gap;
        }

        public String getQ() {
            return q;
        }

        public void setQ(String q) {
            this.q = q;
        }

        public int getGap() {
            return gap;
        }

        public void setGap(int gap) {
            this.gap = gap;
        }
    }

    public static class Benchmark {
        private String cat;
        private int org;
        private int industry;

        public Benchmark() {
        }

        public Benchmark(String cat, int org, int industry) {
            this.cat = cat;
            this.org = org;
            this.industry = industry;
        }

        public String getCat() {
            return cat;
        }

        public void setCat(String cat) {
            this.cat = cat;
        }

        public int getOrg() {
            return org;
        }

        public void setOrg(int org) {
            this.org = org;
        }

        public int getIndustry() {
            return industry;
        }

        public void setIndustry(int industry) {
            this.industry = industry;
        }
    }

    public static class TopMover {
        private String name;
        private String type;
        private String change;
        private boolean positive;

        public TopMover() {
        }

        public TopMover(String name, String type, String change, boolean positive) {
            this.name = name;
            this.type = type;
            this.change = change;
            this.positive = positive;
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

        public String getChange() {
            return change;
        }

        public void setChange(String change) {
            this.change = change;
        }

        public boolean isPositive() {
            return positive;
        }

        public void setPositive(boolean positive) {
            this.positive = positive;
        }
    }
}
