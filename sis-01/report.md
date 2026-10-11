# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the word counter. Delete them or leave them.
-->

**Topic:** 1.3 Software engineering and cost

<!-- Exactly one of 1.1 … 1.10, e.g.  **Topic:** 1.4  -->

---

## 1. Scenario

<!-- 100–150 words, labels included. One small scenario, used in every prompt and in your
     whole answer. Anything fictional is labelled in Assumptions. -->

**Question:** How can engineering methods reduce the total cost of a small marks analyzer over its life, and does faster AI code generation really lower that cost?

**Users:** Course instructors (3–5 people, fictional) who analyze group marks each semester.

**Problem:** Instructors calculate average, highest, lowest and pass rate by hand in spreadsheets, which is slow and inconsistent between instructors.

**Constraints:** (1) The pass threshold changes from semester to semester. (2) Student marks must stay inside the university network.

**Risk:** An AI-generated version runs correctly but silently invents rules, such as how blank or invalid marks are treated, and nobody can safely change it next semester.

**Assumptions:** All fictional: group size of 30 students, pass threshold of 50, one student maintainer, no budget for paid tools.

## 2. Analysis

<!-- 350–400 words. Your answer to the question, the trade-offs, and how it applies to your
     scenario. Explain at least two engineering decisions and why they fit the scenario. -->

Engineering methods reduce the total cost of the marks analyzer mainly by lowering the cost of change, not the cost of the first version. Sommerville's Chapter 1 slides say that for long-lived systems maintenance can cost several times more than development, and Lesson #01 gives 2–4x. No source I opened supports a 60–80% figure, and none covers scripts this small. So the saving is real only if the tool survives several semesters, which is my assumption here, not a fact. For a small script, the methods must stay lightweight, or setup effort will exceed the saving.

Two engineering decisions fit this scenario. First, the rules for blank, non-numeric and out-of-range marks are written down before any code is generated. The main risk in my scenario is a tool that silently invents these rules. If the specification says, for example, that a blank mark is rejected with a clear error and not counted as zero, then both a human and an AI generator work against the same definition, and the result can be checked.

Second, the pass threshold (fictional value: 50) becomes an input parameter, because it changes every semester. This turns a policy change into a configuration change that does not need a programmer. It has a limit, though. A parameter covers a new number, not a new rule. If the department moved to relative grading, the calculation itself would have to be rewritten.

I also keep a small set of unit tests for the agreed cases: a blank mark, an invalid mark and the threshold boundary. With one student maintainer, these tests let the next person change the code and see quickly whether the agreed behavior still holds. They show that these cases work; they do not prove the absence of errors.

On AI code generation, faster output does not automatically mean lower total cost. A first version appears in seconds, but reviewing, testing and understanding it costs what it always did. A structured prompt stating the validation rules reduces silent assumptions, so AI is not inherently harmful, but output still needs verification because an unstated rule such as rounding can be filled in by a guess.

Keeping marks inside the university network is a compliance constraint, not a cost saving: a free public web tool costs nothing yet breaks it. I treat the two as separate trade-offs and run the tool locally.

## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

Prompt B returned five concerns, and I judged each one. (1) Scale: qualified. The draft applied enterprise maintenance ratios to a tiny script; I agree the methods must stay lightweight, but the slides still support designing for change if the tool lasts several semesters. (2) AI is not inherently harmful: qualified. Structured prompts do reduce silent assumptions, but the critique's counterexample, a 'Prompt D methodology', has no source, so I did not rely on it. (3) Privacy is not a cost saving: accepted. It is a compliance constraint, and I separated the two in section 2. (4) Parameterization does not cover a changed grading formula: accepted. (5) Maintainer capability: rejected, because my scenario already assumes one student maintainer.

I checked two claims in the course slides. In verification row 1, the draft's '60%–80%' maintenance figure is qualified: Sommerville's Chapter 1 slides 4 and 11 say maintenance may be several times development cost and that most costs come after release, and Lesson #01 gives 2–4x, but no source I opened gives 60–80%. In verification row 2, the claim that construction is only a small fraction of total cost is qualified: slide 8 says evolution often exceeds development for custom software, and slide 4 limits this to long-life systems.

Two revisions follow from this. In change-log row 1, the 60–80% figure became 'several times', because of the evidence in row 1. In change-log row 2, 'unit tests guarantee long-term stability' became a claim that tests show the agreed cases behave as specified, because tests cannot prove the absence of errors and the maintainer is one student.

One gap remains: I found no source on costs for scripts this small, so the saving rests on my assumption that the tool will be reused.

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->

For this marks analyzer I recommend a lightweight engineering approach: write the rules for blank and invalid marks before any code is generated, make the pass threshold an input parameter, and keep a few unit tests for the agreed cases. AI generation is useful for producing the first version quickly, but it lowers total cost only if a person has specified the rules and verified the result. The main limitation is the evidence. The course slides support the idea that change costs more than first development for long-lived systems, but they say nothing about scripts this small, and my numbers (30 students, threshold 50, one maintainer) are fictional. If the tool is dropped after one semester, much of this effort would not pay off.

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->

Working through this assignment with Gemini highlighted both the value and the limitations of AI in software engineering. The initial draft produced by the AI sounded persuasive, but a closer review against our course materials revealed significant flaws. Specifically, the AI applied enterprise-level maintenance cost ratios (60%–80%) to a tiny 30-line script. Checking Sommerville’s lecture slides showed that maintenance costs exceed development by 2–4x for custom systems, but this ratio assumes a multi-semester lifecycle. 

Prompt B’s critique helped me recognize that keeping student marks inside the campus network is a strict security compliance constraint, not a financial cost-saving measure. I also learned that parameterizing the pass mark only handles numerical updates; if the department changes the grading formula itself, code refactoring is still required. 

Ultimately, this exercise taught me that AI generation accelerates first drafts, but human verification remains non-negotiable. For micro-utility scripts, engineering overhead must stay lightweight so setup effort does not outweigh lifetime maintenance savings.

## 6. References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the verification table must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 1.
-->

- Sommerville, I. Software Engineering, Chapter 1 (Introduction), lecture slides, Lectures 1–2.
- Kydyralin, M. (2026). AI-Driven Software Engineering, Lesson #01 lecture slides. KBTU SITE.
- Kydyralin, M. (2026). AI-Driven Software Engineering, Lesson #02 lecture slides. KBTU SITE.

## 7. Appendix A — Initial outline

<!-- Written BEFORE you run Prompt A. Five points, your own words, numbered. These are the
     "five points" you paste into Prompt A. -->

1. Defining edge-case behavior (e.g., handling non-numeric cells or blank entries) before code generation prevents costly bugs and manual re-checking during semester grade submissions.
2. Making the pass threshold a configurable parameter rather than hardcoded value reduces future maintenance effort when grading policies change.
3. Writing lightweight unit tests guarantees that subsequent student maintainers can safely update the tool without breaking mark calculation logic.
4. Rapid AI code generation lowers initial development time, but unverified AI-generated assumptions increase long-term debugging and maintenance overhead.
5. Using local scripts or self-hosted university infrastructure ensures student data remains within the local network while avoiding paid SaaS subscription costs.

## 8. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the fenced block that follows its label. If a response itself contains ``` lines, open
     and close that block with ~~~~ instead. You may add B4, B5 … after B3 if you ran more. -->

### B1 — Draft (Prompt A)

- **Tool:** Gemini app
- **Model:** 3.6 Flash
- **Date:** 2026-10-11
- **Purpose:** contextual draft

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

```text
Act as a software engineering tutor. Help me analyze topic 1.3 (Software engineering and cost): How can engineering methods reduce the total cost of a small marks analyzer over its life, and does faster AI code generation really lower that cost? for a first-year-level university assignment.

My scenario is users: course instructors (3–5 people, fictional) who analyze group marks each semester; problem: instructors calculate average, highest, lowest and pass rate by hand in spreadsheets, which is slow and inconsistent between instructors; constraints: (1) the pass threshold changes from semester to semester, (2) student marks must stay inside the university network; risk: an AI-generated version runs correctly but silently invents rules, such as how blank or invalid marks are treated, and nobody can safely change it next semester. My initial ideas are 1. Defining edge-case behavior (e.g., handling non-numeric cells or blank entries) before code generation prevents costly bugs and manual re-checking during semester grade submissions. 2. Making the pass threshold a configurable parameter rather than hardcoded value reduces future maintenance effort when grading policies change. 3. Writing lightweight unit tests guarantees that subsequent student maintainers can safely update the tool without breaking mark calculation logic. 4. Rapid AI code generation lowers initial development time, but unverified AI-generated assumptions increase long-term debugging and maintenance overhead. 5. Using local scripts or self-hosted university infrastructure ensures student data remains within the local network while avoiding paid SaaS subscription costs. Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.
```

**Response:**

```text
Facts vs. Assumptions
Facts (Explicit Scenario Details)

Users & Purpose: 3–5 course instructors calculate group averages, highest/lowest marks, and pass rates each semester.

Current Workflow: Manual spreadsheet calculations that are slow and inconsistent between instructors.

Constraints: Pass thresholds change from semester to semester, and student marks must strictly remain within the local university network.

Primary Risk: An AI-generated script runs correctly but silently invents rules (such as how blank or invalid entries are handled) that future maintainers cannot safely alter.

Assumptions (Contextual Inferences)

Class Size: Standard course sections contain approximately 30 students per section.

Execution Frequency: Mark analysis occurs 2–3 times per academic year during grading periods.

Maintainer Model: Ongoing maintenance and updates are handed off to a single student developer.

Budget: Zero financial budget is allocated for commercial software licenses or paid SaaS subscription APIs.

Draft Explanation: Life-Cycle Cost & AI Code Generation
In small-scale academic software projects, initial code construction represents only a small fraction of the total cost of ownership (TCO). For a departmental marks analyzer utilized by course instructors, the primary financial and operational expenses emerge during post-release maintenance, manual re-checking, and code debugging when institutional grading policies evolve. Over the multi-year lifecycle of a software tool, these post-release maintenance tasks dominate overall operational expenditure. Applying formal software engineering principles directly reduces this total cost by establishing maintainability, testability, and data security from the very beginning of the development process.

First, defining explicit edge-case behaviors—such as handling non-numeric cells, missing entries, or out-of-range values—before initiating code generation prevents silent runtime failures. In manual spreadsheet workflows, inconsistent handling of blank entries routinely produces hidden calculation errors during semester grade submissions. When business rules and validation constraints are specified upfront, the tool executes predictable validation logic, eliminating the recurring operational overhead of instructors manually auditing individual spreadsheet formulas every term.

Second, parameterizing dynamic business rules minimizes long-term maintenance effort. University grading thresholds frequently fluctuate across academic terms based on departmental decisions. Hardcoding a fixed pass threshold inside core application logic forces future maintainers to modify source code directly, introducing significant regression risks. Engineering the pass threshold as a configurable input parameter or command-line option decouples policy updates from core execution logic, reducing future maintenance tasks to a simple configuration update.

Third, incorporating lightweight automated unit tests guarantees long-term system stability. In university environments, software tools are regularly handed down across graduating cohorts to new student maintainers. Without automated tests, subsequent maintainers cannot refactor or update the tool with confidence. A concise test suite covering core statistical calculations and boundary conditions guarantees that future enhancements do not introduce silent bugs, protecting the application against costly, high-pressure debugging cycles during grade submissions.

Regarding AI code generation: rapid generation lowers initial construction time, but does not automatically lower total life-cycle cost. While AI tools can generate functional scripts in seconds, they frequently introduce implicit assumptions about edge cases, such as silently dropping missing values or applying default rounding rules. Identifying and fixing poorly understood AI assumptions under tight grade submission deadlines requires far more time and effort than writing structured code initially. Additionally, executing scripts locally on self-hosted university infrastructure satisfies strict data privacy constraints while avoiding recurring commercial SaaS subscription fees. By enforcing local execution, student mark records never leave the secure campus network. Ultimately, AI code generation only lowers total cost when combined with human specification, boundary testing, and systematic code verification.

Trade-offs & Claims to Verify
Engineering Trade-offs

Upfront Specification vs. Initial Speed: Spending time defining edge cases, parameterized configs, and unit tests increases Day 1 setup effort, but drastically minimizes recurring operational re-checking and downstream maintenance debugging.

AI Speed vs. Verification Cost: Generating scripts with AI takes seconds, but validating that no implicit logic or privacy vulnerabilities were introduced requires rigorous code auditing and test execution.

Claims to Verify

Maintenance Cost Dominance: Verify the software engineering rule of thumb in standard textbooks (e.g., Pressman or Sommerville) that maintenance accounts for the majority (60%–80%) of total software life-cycle costs.

Implicit AI Assumptions: Experiment with your chosen AI generator using an ambiguous prompt to verify whether it silently drops blank cells, defaults invalid inputs to zero, or hardcodes pass thresholds
```

### B2 — Critique (Prompt B)

- **Tool:** Gemini app
- **Model:** 3.6 Flash
- **Date:** 2026-10-11
- **Purpose:** critical review of the draft

**Prompt:**

```text
Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.
For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.
Question: How can engineering methods reduce the total cost of a small marks analyzer over its life, and does faster AI code generation really lower that cost? Scenario: Users: course instructors (3–5 people, fictional) who analyze group marks each semester. Problem: instructors calculate average, highest, lowest and pass rate by hand in spreadsheets, which is slow and inconsistent between instructors. Constraints: (1) the pass threshold changes from semester to semester, (2) student marks must stay inside the university network. Risk: an AI-generated version runs correctly but silently invents rules, such as how blank or invalid marks are treated, and nobody can safely change it next semester. Draft: Facts vs. Assumptions
Facts (Explicit Scenario Details)
- Users & Purpose: 3–5 course instructors calculate group averages, highest/lowest marks, and pass rates each semester.
- Current Workflow: Manual spreadsheet calculations that are slow and inconsistent between instructors.
- Constraints: Pass thresholds change from semester to semester, and student marks must strictly remain within the local university network.
- Primary Risk: An AI-generated script runs correctly but silently invents rules (such as how blank or invalid entries are handled) that future maintainers cannot safely alter.
Assumptions (Contextual Inferences)
- Class Size: Standard course sections contain approximately 30 students per section.
- Execution Frequency: Mark analysis occurs 2–3 times per academic year during grading periods.
- Maintainer Model: Ongoing maintenance and updates are handed off to a single student developer.
- Budget: Zero financial budget is allocated for commercial software licenses or paid SaaS subscription APIs.
Draft Explanation: Life-Cycle Cost & AI Code Generation
In small-scale academic software projects, initial code construction represents only a small fraction of the total cost of ownership (TCO). For a departmental marks analyzer utilized by course instructors, the primary financial and operational expenses emerge during post-release maintenance, manual re-checking, and code debugging when institutional grading policies evolve. Over the multi-year lifecycle of a software tool, these post-release maintenance tasks dominate overall operational expenditure. Applying formal software engineering principles directly reduces this total cost by establishing maintainability, testability, and data security from the very beginning of the development process.
First, defining explicit edge-case behaviors—such as handling non-numeric cells, missing entries, or out-of-range values—before initiating code generation prevents silent runtime failures. In manual spreadsheet workflows, inconsistent handling of blank entries routinely produces hidden calculation errors during semester grade submissions. When business rules and validation constraints are specified upfront, the tool executes predictable validation logic, eliminating the recurring operational overhead of instructors manually auditing individual spreadsheet formulas every term.
Second, parameterizing dynamic business rules minimizes long-term maintenance effort. University grading thresholds frequently fluctuate across academic terms based on departmental decisions. Hardcoding a fixed pass threshold inside core application logic forces future maintainers to modify source code directly, introducing significant regression risks. Engineering the pass threshold as a configurable input parameter or command-line option decouples policy updates from core execution logic, reducing future maintenance tasks to a simple configuration update.
Third, incorporating lightweight automated unit tests guarantees long-term system stability. In university environments, software tools are regularly handed down across graduating cohorts to new student maintainers. Without automated tests, subsequent maintainers cannot refactor or update the tool with confidence. A concise test suite covering core statistical calculations and boundary conditions guarantees that future enhancements do not introduce silent bugs, protecting the application against costly, high-pressure debugging cycles during grade submissions.
Regarding AI code generation: rapid generation lowers initial construction time, but does not automatically lower total life-cycle cost. While AI tools can generate functional scripts in seconds, they frequently introduce implicit assumptions about edge cases, such as silently dropping missing values or applying default rounding rules. Identifying and fixing poorly understood AI assumptions under tight grade submission deadlines requires far more time and effort than writing structured code initially. Additionally, executing scripts locally on self-hosted university infrastructure satisfies strict data privacy constraints while avoiding recurring commercial SaaS subscription fees. By enforcing local execution, student mark records never leave the secure campus network. Ultimately, AI code generation only lowers total cost when combined with human specification, boundary testing, and systematic code verification.
Trade-offs & Claims to Verify
Engineering Trade-offs
- Upfront Specification vs. Initial Speed: Spending time defining edge cases, parameterized configs, and unit tests increases Day 1 setup effort, but drastically minimizes recurring operational re-checking and downstream maintenance debugging.
- AI Speed vs. Verification Cost: Generating scripts with AI takes seconds, but validating that no implicit logic or privacy vulnerabilities were introduced requires rigorous code auditing and test execution.
Claims to Verify
- Maintenance Cost Dominance: Verify the software engineering rule of thumb in standard textbooks (e.g., Pressman or Sommerville) that maintenance accounts for the majority (60%–80%) of total software life-cycle costs.
- Implicit AI Assumptions: Experiment with your chosen AI generator using an ambiguous prompt to verify whether it silently drops blank cells, defaults invalid inputs to zero, or hardcodes pass thresholds
```

**Response:**

```text
1. Scale Fallacy: Applying Enterprise TCO Ratios to a Micro-Script
Issue (Unsupported Assumption): The draft applies general software engineering life-cycle cost rules—where maintenance accounts for 60%–80% of Total Cost of Ownership (TCO)—directly to a 30–50 line script used by 3–5 instructors.

Why It Matters: For small-scale utility scripts, upfront engineering overhead (writing formal specifications, configuration parsers, and test suites) can easily exceed the total time required to write or fix the script manually over its entire lifetime.

How to Check It: Calculate the developer hours spent setting up test harnesses and configuration files versus the estimated minutes spent debugging a simple script over 3 years.

Counterexample / Alternative Interpretation: A student spends 3 hours writing unit tests, CLI parsers, and specification docs for a 30-line Python script. The script runs untouched for two years. Upfront engineering constituted 90% of total lifecycle effort, meaning formal maintenance cost models did not apply.

2. Monolithic Treatment of AI Code Generation
Issue (Vague Claim / Missing Reasoning): The draft portrays AI code generation as an inherently risky shortcut that inflates downstream debugging costs.

Why It Matters: AI tools do not inherently invent silent rules; unguided or ambiguous prompts cause silent assumptions. When combined with structured prompting that includes edge-case specifications, AI can generate both validated code and automated unit tests simultaneously.

How to Check It: Compare code generated from a minimal prompt ("Analyze student marks") against a structured prompt containing explicit edge-case rules ("Raise ValueError on blank/boolean entries, accept configurable pass_mark").

Counterexample / Alternative Interpretation: Using a structured prompt (e.g., Prompt D methodology) produces fully verified validation logic and unit test suites in seconds. In this context, AI reduces both initial construction time and downstream maintenance costs.

3. Conflating Network Privacy Constraints with Software Cost
Issue (Inaccuracy): The draft links local execution to subscription cost avoidance, claiming that keeping student data on local infrastructure avoids paid SaaS fees.

Why It Matters: Keeping data inside the university network is a compliance/security constraint, not a financial choice. Conflating network compliance with cost savings is logically flawed: public cloud tools can be free ($0) yet non-compliant, whereas local execution requires local machine setup and hardware maintenance.

How to Check It: Evaluate zero-cost cloud options (e.g., public AI web interfaces) against local execution requirements.

Counterexample / Alternative Interpretation: A free web tool costs $0 in software licenses but violates university network constraints. Conversely, hosting an on-premise script costs $0 in software but requires local machine maintenance, demonstrating that security compliance and cost reduction are distinct engineering trade-offs.

4. Over-Estimating Parameterization Against Policy Changes
Issue (Vague Claim / Oversimplification): The draft claims that making pass_threshold a parameter eliminates future maintenance effort when grading policies change.

Why It Matters: Parameterization only handles variable changes (e.g., changing 50 to 60). It does not prevent code changes if the grading policy structure evolves (e.g., switching from pass/fail thresholds to curved grading or letter grades).

How to Check It: Review past university grading policy updates to see whether historical changes involved simple numeric threshold adjustments or structural formula changes.

Counterexample / Alternative Interpretation: The department changes grading from a fixed pass mark to a relative curve (top 85% pass). Parameterizing pass_mark=50 becomes useless, forcing future maintainers to rewrite core calculation logic regardless of parameterization.

5. Unstated Maintainer Capability Assumption
Issue (Unsupported Assumption): The draft assumes automated unit tests directly benefit "future student maintainers" without defining the maintainer model.

Why It Matters: If the 3–5 course instructors maintain the tool themselves without a technical background, Python unit test suites (pytest/unittest) add operational friction rather than lowering maintenance costs.

How to Check It: Confirm who handles tool updates in the scenario—non-technical course instructors or a designated student developer.

Counterexample / Alternative Interpretation: Non-technical instructors inherit a script with a unit test suite. Lacking knowledge of terminal test runners, they ignore the test suite entirely when modifying logic. The unit tests provide $0 in maintenance savings.
```

### B3 — Revision (Prompt C)

- **Tool:** Gemini app
- **Model:** 3.6 Flash
- **Date:** 2026-10-11
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```text
Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

My decisions: (1) Scale concern: qualified, engineering effort for a small marks analyzer must stay lightweight. (2) AI is not inherently harmful: qualified, structured prompts help but output still needs verification. (3) Privacy constraint is not a cost saving: accepted, they are separate trade-offs. (4) Parameterizing the threshold does not cover changes to the grading formula itself: accepted. (5) Maintainer capability: rejected, the scenario assumes one student maintainer. Verified evidence: Claim "maintenance is 60%-80% of life-cycle cost" is qualified: Sommerville Ch.1 lecture slides, slide 4 says maintenance costs may be several times development costs for long-life systems, slide 11 says for most systems the majority of costs come from changing software after use; Lesson #01 slides, "Software costs", give 2-4x. No 60-80% figure appears in these sources. Claim "initial construction is only a small fraction of TCO" is qualified: Sommerville Ch.1 slides, slide 8, for custom software evolution costs often exceed development costs; slide 4 limits this to long-life systems. Draft:Facts vs. Assumptions
Facts (Explicit Scenario Details)

Users & Purpose: 3–5 course instructors calculate group averages, highest/lowest marks, and pass rates each semester.

Current Workflow: Manual spreadsheet calculations that are slow and inconsistent between instructors.

Constraints: Pass thresholds change from semester to semester, and student marks must strictly remain within the local university network.

Primary Risk: An AI-generated script runs correctly but silently invents rules (such as how blank or invalid entries are handled) that future maintainers cannot safely alter.

Assumptions (Contextual Inferences)

Class Size: Standard course sections contain approximately 30 students per section.

Execution Frequency: Mark analysis occurs 2–3 times per academic year during grading periods.

Maintainer Model: Ongoing maintenance and updates are handed off to a single student developer.

Budget: Zero financial budget is allocated for commercial software licenses or paid SaaS subscription APIs.

Draft Explanation: Life-Cycle Cost & AI Code Generation
In small-scale academic software projects, initial code construction represents only a small fraction of the total cost of ownership (TCO). For a departmental marks analyzer utilized by course instructors, the primary financial and operational expenses emerge during post-release maintenance, manual re-checking, and code debugging when institutional grading policies evolve. Over the multi-year lifecycle of a software tool, these post-release maintenance tasks dominate overall operational expenditure. Applying formal software engineering principles directly reduces this total cost by establishing maintainability, testability, and data security from the very beginning of the development process.

First, defining explicit edge-case behaviors—such as handling non-numeric cells, missing entries, or out-of-range values—before initiating code generation prevents silent runtime failures. In manual spreadsheet workflows, inconsistent handling of blank entries routinely produces hidden calculation errors during semester grade submissions. When business rules and validation constraints are specified upfront, the tool executes predictable validation logic, eliminating the recurring operational overhead of instructors manually auditing individual spreadsheet formulas every term.

Second, parameterizing dynamic business rules minimizes long-term maintenance effort. University grading thresholds frequently fluctuate across academic terms based on departmental decisions. Hardcoding a fixed pass threshold inside core application logic forces future maintainers to modify source code directly, introducing significant regression risks. Engineering the pass threshold as a configurable input parameter or command-line option decouples policy updates from core execution logic, reducing future maintenance tasks to a simple configuration update.

Third, incorporating lightweight automated unit tests guarantees long-term system stability. In university environments, software tools are regularly handed down across graduating cohorts to new student maintainers. Without automated tests, subsequent maintainers cannot refactor or update the tool with confidence. A concise test suite covering core statistical calculations and boundary conditions guarantees that future enhancements do not introduce silent bugs, protecting the application against costly, high-pressure debugging cycles during grade submissions.

Regarding AI code generation: rapid generation lowers initial construction time, but does not automatically lower total life-cycle cost. While AI tools can generate functional scripts in seconds, they frequently introduce implicit assumptions about edge cases, such as silently dropping missing values or applying default rounding rules. Identifying and fixing poorly understood AI assumptions under tight grade submission deadlines requires far more time and effort than writing structured code initially. Additionally, executing scripts locally on self-hosted university infrastructure satisfies strict data privacy constraints while avoiding recurring commercial SaaS subscription fees. By enforcing local execution, student mark records never leave the secure campus network. Ultimately, AI code generation only lowers total cost when combined with human specification, boundary testing, and systematic code verification.

Trade-offs & Claims to Verify
Engineering Trade-offs

Upfront Specification vs. Initial Speed: Spending time defining edge cases, parameterized configs, and unit tests increases Day 1 setup effort, but drastically minimizes recurring operational re-checking and downstream maintenance debugging.

AI Speed vs. Verification Cost: Generating scripts with AI takes seconds, but validating that no implicit logic or privacy vulnerabilities were introduced requires rigorous code auditing and test execution.

Claims to Verify

Maintenance Cost Dominance: Verify the software engineering rule of thumb in standard textbooks (e.g., Pressman or Sommerville) that maintenance accounts for the majority (60%–80%) of total software life-cycle costs.

Implicit AI Assumptions: Experiment with your chosen AI generator using an ambiguous prompt to verify whether it silently drops blank cells, defaults invalid inputs to zero, or hardcodes pass thresholds

Show what you changed and why. Use only the sources I supplied. Flag remaining gaps instead of inventing details.
```

**Response:**

```text
Summary of Changes
Qualified Maintenance Cost Ratios (Scale Concern & Evidence Check): Replaced the general "60%–80%" figure with exact evidence from course materials. Course slides note that maintenance costs range from 2x to 4x development costs for custom systems, with higher multiples occurring primarily in long-life software. Clarified that for a small utility script, engineering methods must remain strictly lightweight so upfront design overhead does not exceed lifetime maintenance effort.

Nuanced AI Evaluation (Decision 2): Corrected the depiction of AI code generation. Structured prompting (e.g., defining explicit validation rules upfront) significantly reduces silent edge-case assumptions, though human verification remains necessary.

Decoupled Data Privacy from Financial Savings (Decision 3): Separated network security compliance from software cost reduction. Enforcing local execution keeps student mark data inside the campus network as a mandatory compliance constraint, rather than a strategy to avoid paid SaaS subscriptions.

Delimited Parameterization Scope (Decision 4): Clarified that parameterizing pass_threshold simplifies numeric boundary updates across terms, but does not prevent source code changes if the underlying grading formula itself changes (e.g., shifting to relative curving).

Reaffirmed Maintainer Model (Decision 5): Retained the single student maintainer assumption as specified in the scenario constraints.

Facts vs. Assumptions
Facts (Explicit Scenario Details):

Users & Purpose: 3–5 course instructors calculate group averages, highest/lowest marks, and pass rates each semester.

Current Problem: Manual spreadsheet processing is slow and inconsistent across instructors.

Constraints: Pass thresholds change term-by-term; student marks must strictly remain within the local university network.

Primary Risk: AI-generated code runs correctly but silently invents unstated rules (e.g., handling blank or non-numeric entries) that future maintainers cannot safely modify.

Assumptions (Contextual Inferences):

Maintainer Model: Ongoing updates and maintenance are handled by a single student developer.

Class & Usage Scope: Average class size is approximately 30 students per section, processed 2–3 times per academic year.

Budget: No financial budget is allocated for software licenses or external paid APIs.

Revised Draft Explanation: Life-Cycle Cost & AI Code Generation
In software engineering, post-release software evolution and maintenance frequently exceed initial development costs—often by 2x to 4x for custom systems, and higher for long-life software. For a departmental marks analyzer, direct financial expenses are negligible, but operational costs arise from manual re-checking, debugging, and handoffs across academic terms. However, because this tool is a small utility script used by 3–5 instructors, formal engineering methods must remain lightweight so that initial specification effort does not exceed the script's total lifetime value.

First, defining explicit edge-case behaviors—such as handling missing, non-numeric, or blank entries—before writing or generating code directly targets the risk of silent calculation errors. In spreadsheet workflows, unvalidated entries cause inconsistent results between instructors. Specifying input validation upfront eliminates the operational overhead of instructors manually auditing spreadsheet formulas every semester.

Second, parameterizing dynamic business rules reduces routine maintenance effort. Configuring pass_threshold as an input parameter decouples policy updates from core execution logic, allowing instructors to update pass criteria without modifying source code. However, parameterization only handles numeric threshold shifts; if the department structurally alters its grading formula (e.g., moving from a fixed pass threshold to relative curving), source code modifications remain required.

Third, because tool maintenance is handed down to a single student maintainer, lightweight automated unit tests provide essential regression protection. A concise test suite covering boundary conditions ensures that a new maintainer can update or refactor the script without breaking statistical calculation logic during grade submission deadlines.

Regarding AI code generation: rapid generation lowers initial construction time, but does not automatically lower total life-cycle costs. AI models do not inherently invent bad logic; applying structured prompts with explicit constraints significantly reduces unstated assumptions. Nevertheless, generated code requires systematic verification, as undetected assumptions regarding rounding or empty values can cause silent failures. Furthermore, executing scripts locally satisfies the strict compliance requirement of keeping student marks within the university network. Local execution is a security constraint rather than a cost-saving measure, as external cloud tools could be free yet non-compliant. Ultimately, AI code generation lowers total lifecycle effort only when combined with lightweight specification, explicit boundary checks, and human verification.

Trade-offs & Remaining Gaps
Engineering Trade-offs
Lightweight Specification vs. Over-Engineering: Spending time writing formal specs, CLI parsers, and test suites prevents downstream bugs, but must be kept minimal so setup time does not outweigh lifetime maintenance savings on a micro-script.

Prompting Speed vs. Verification Effort: Utilizing structured prompts accelerates initial code creation, but human code auditing and execution against test suites remain mandatory to verify edge-case compliance.

Remaining Gaps & Uncertainty
Micro-Script Lifecycle Ratios: Course materials confirm that software evolution costs exceed initial development by 2x to 4x for standard custom software systems. However, specific empirical cost ratios for micro-utility scripts (<100 lines) are omitted in the course sources and represent a coverage gap.

Model-Specific Edge-Case Handling: Exact default behaviors (e.g., whether an unprompted model silently drops blank cells or converts them to zero) vary by AI model version and must be verified empirically per tool.
```

## 9. Appendix C — Evidence tables

### Verification table

<!-- At least two complete rows. Source and locator: title + page / slide / section / chapter,
     or title + URL + access date (YYYY-MM-DD). Decision: keep, qualify or reject — one word. -->

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| "Verify the software engineering rule of thumb in standard textbooks (e.g., Pressman or Sommerville) that maintenance accounts for the majority (60%–80%) of total software life-cycle costs." | Sommerville, I. Software Engineering, Chapter 1 lecture slides, slide 4 ("Software costs") and slide 11 ("Importance of software engineering"); Kydyralin, M. (2026), Lesson #01 slides, "Software costs" | The slides say that for long-life systems maintenance costs may be several times development costs, and that for most system types the majority of costs come from changing the software after it is in use. Lesson #01 gives 2–4x. None of the sources I opened contains a 60%–80% figure. | qualify |
| "In small-scale academic software projects, initial code construction represents only a small fraction of the total cost of ownership (TCO)." | Sommerville, I. Software Engineering, Chapter 1 lecture slides, slide 8 (FAQ "What are the costs of software engineering?") and slide 4 | Slide 8 says that for custom software, evolution costs often exceed development costs, and slide 4 ties the "several times" claim to systems with a long life. The sources do not show this for a small script used by a few instructors, so the claim holds only if the tool is kept in use over several semesters. | qualify |

### Change log

<!-- At least two substantive revisions. Your final version must differ from the AI wording,
     and the reason must say which evidence or scenario constraint made you change it. -->

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| "maintenance accounts for the majority (60%–80%) of total software life-cycle costs" | "For long-lived systems, maintenance can cost several times more than development, so the marks analyzer should be designed for change if it is reused over several semesters." | Verification row 1: the lecture slides give "several times" (Lesson #01: 2–4x) and contain no 60%–80% figure. Scenario constraint: the tool is only worth maintaining if it survives the semesters. |
| "incorporating lightweight automated unit tests guarantees long-term system stability" | "A small set of unit tests shows that the agreed cases (blank mark, invalid mark, threshold boundary) behave as specified, but it does not prove the absence of errors." | Tests cannot guarantee stability. B2 point 1 (scale): the maintainer is one student and the script is small, so the tests must stay lightweight and focused on the agreed rules. |
