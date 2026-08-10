package com.okgip.model;

public enum Proficiency {
    UNAWARE(0), BEGINNER(1), INTERMEDIATE(2), ADVANCED(3), EXPERT(4);

    private final int value;

    Proficiency(int value) { this.value = value; }

    public int getValue() { return value; }

    public static Proficiency fromValue(int v) {
        for (Proficiency p : values()) if (p.value == v) return p;
        return v < 0 ? UNAWARE : EXPERT;
    }
}
