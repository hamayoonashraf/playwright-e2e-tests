export default class TestData {
  static makeAppointmentTestData() {
    return [
      {
        testId: "TC001",
        facility: "Tokyo CURA Healthcare Center",
        hcp: "Medicare",
        visitDt: "26/05/2026",
      },
      {
        testId: "TC002",
        facility: "Hongkong CURA Healthcare Center",
        hcp: "Medicaid",
        visitDt: "26/07/2026",
      },
      {
        testId: "TC003",
        facility: "Seoul CURA Healthcare Center",
        hcp: "None",
        visitDt: "26/09/2026",
      },
    ];
  }

  static apiUserCreation() {
    return [
      {
        name: "Hamayoon",
        job: "QA",
        id: "6666",
        createdAt: "2025-10-10T01:35:49.877Z",
      },
    ];
  }
}
