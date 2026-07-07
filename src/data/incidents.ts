// Static definition data for all incident types
// Defines severity, rewards, health impact, fix options, and escalation chains

import type { IncidentType, Severity } from "../types";

export interface FixOption {
  label: string;
  correct: boolean;
  feedback: string;
}

export interface IncidentDefinition {
  type: IncidentType;
  label: string;
  description: string;
  severity: Severity;
  healthImpact: number;
  catnipReward: number;
  influenceReward: number;
  timeLimit: number | null;
  escalatesTo: IncidentType | null;
  fixOptions: FixOption[];
}

export const INCIDENT_DEFINITIONS: IncidentDefinition[] = [
  {
    type: "meowdns-failure",
    label: "MeowDNS Failure",
    description:
      "The DNS server is down. Devices can no longer find each other by name.",
    severity: "medium",
    healthImpact: 15,
    catnipReward: 40,
    influenceReward: 10,
    timeLimit: null,
    escalatesTo: null,
    fixOptions: [
      {
        label: "Restart the MeowDNS Server",
        correct: true,
        feedback: "The DNS server is back online. Name resolution restored.",
      },
      {
        label: "Reboot the Purrtocol Router",
        correct: false,
        feedback: "The router was not the problem. DNS is still down.",
      },
      {
        label: "Increase Catnip Cloud capacity",
        correct: false,
        feedback: "That had no effect. The DNS server is still offline.",
      },
    ],
  },
  {
    type: "router-overload",
    label: "Router Overload",
    description:
      "The Purrtocol Router is overwhelmed with traffic and dropping packets.",
    severity: "medium",
    healthImpact: 20,
    catnipReward: 40,
    influenceReward: 10,
    timeLimit: null,
    escalatesTo: null,
    fixOptions: [
      {
        label: "Throttle traffic and upgrade router capacity",
        correct: true,
        feedback: "Traffic is flowing smoothly again.",
      },
      {
        label: "Restart the MeowDNS Server",
        correct: false,
        feedback: "DNS was not the issue. The router is still overloaded.",
      },
      {
        label: "Add another Pawwall",
        correct: false,
        feedback: "A firewall won't help with routing. Packets still dropping.",
      },
    ],
  },
  {
    type: "mouseware-infection",
    label: "Mouseware Infection",
    description:
      "Malware detected! It will spread to adjacent devices if not contained quickly.",
    severity: "high",
    healthImpact: 35,
    catnipReward: 80,
    influenceReward: 25,
    timeLimit: 30000,
    escalatesTo: null,
    fixOptions: [
      {
        label: "Isolate and quarantine the infected device",
        correct: true,
        feedback: "Device quarantined. The mouseware has been contained.",
      },
      {
        label: "Restart the device",
        correct: false,
        feedback: "Restarting did not remove the infection. It is spreading.",
      },
      {
        label: "Update Pawwall rules",
        correct: false,
        feedback:
          "Too late for that — the infection is already inside the network.",
      },
    ],
  },
  {
    type: "pawwall-misconfiguration",
    label: "Pawwall Misconfiguration",
    description:
      "The firewall rules are wrong. Legitimate traffic is being blocked or threats are slipping through.",
    severity: "low",
    healthImpact: 10,
    catnipReward: 25,
    influenceReward: 5,
    timeLimit: null,
    escalatesTo: null,
    fixOptions: [
      {
        label: "Review and correct the Pawwall rule set",
        correct: true,
        feedback: "Rules corrected. Traffic is flowing as intended.",
      },
      {
        label: "Restart the Pawwall",
        correct: false,
        feedback: "The rules persist after restart. Nothing has changed.",
      },
      {
        label: "Replace the Pawwall entirely",
        correct: false,
        feedback: "Overkill — and it cost extra catnip for no reason.",
      },
    ],
  },
  {
    type: "unauthorized-dog-access",
    label: "Unauthorized Dog Access",
    description:
      "A rival dog faction is attempting to break into the cat network.",
    severity: "high",
    healthImpact: 25,
    catnipReward: 70,
    influenceReward: 20,
    timeLimit: 45000,
    escalatesTo: "mouseware-infection",
    fixOptions: [
      {
        label: "Block the source at the Pawwall and rotate access keys",
        correct: true,
        feedback: "Intrusion blocked. The dogs have been repelled.",
      },
      {
        label: "Restart the Purrtocol Router",
        correct: false,
        feedback:
          "The attacker is still connected. Rebooting the router did nothing.",
      },
      {
        label: "Increase network health manually",
        correct: false,
        feedback:
          "That treats the symptom, not the cause. The dogs are still in.",
      },
    ],
  },
  {
    type: "broken-cat5",
    label: "Broken Cat-5 Link",
    description:
      "A physical cable has failed, severing the connection between two nodes.",
    severity: "medium",
    healthImpact: 20,
    catnipReward: 35,
    influenceReward: 8,
    timeLimit: null,
    escalatesTo: null,
    fixOptions: [
      {
        label: "Replace the damaged Cat-5 cable",
        correct: true,
        feedback: "Link restored. The two nodes are reconnected.",
      },
      {
        label: "Restart both connected devices",
        correct: false,
        feedback: "The cable is still broken. Rebooting did not help.",
      },
      {
        label: "Reroute traffic through the router",
        correct: false,
        feedback: "A temporary workaround but the link is still severed.",
      },
    ],
  },
  {
    type: "catnip-cloud-crash",
    label: "Catnip Cloud Crash",
    description:
      "The cloud server has crashed. Passive catnip income is suspended until restored.",
    severity: "medium",
    healthImpact: 20,
    catnipReward: 50,
    influenceReward: 12,
    timeLimit: null,
    escalatesTo: null,
    fixOptions: [
      {
        label: "Restart the server and add redundancy",
        correct: true,
        feedback: "Server is back online. Catnip income resumed.",
      },
      {
        label: "Increase Pawwall strictness",
        correct: false,
        feedback: "The firewall was not the cause. Server is still down.",
      },
      {
        label: "Reboot the router",
        correct: false,
        feedback: "Wrong device. The cloud server is still crashed.",
      },
    ],
  },
  {
    type: "network-congestion",
    label: "Network Congestion",
    description:
      "Bandwidth across Cat-5 Links is saturated. Everything is running slow.",
    severity: "medium",
    healthImpact: 15,
    catnipReward: 35,
    influenceReward: 8,
    timeLimit: null,
    escalatesTo: null,
    fixOptions: [
      {
        label: "Upgrade link capacity and reroute traffic",
        correct: true,
        feedback: "Bandwidth increased. Network is flowing freely again.",
      },
      {
        label: "Restart the MeowDNS Server",
        correct: false,
        feedback: "DNS was not the bottleneck. Congestion continues.",
      },
      {
        label: "Add a new Pawwall",
        correct: false,
        feedback: "A firewall does not add bandwidth. Still congested.",
      },
    ],
  },
  {
    type: "ddos-attack",
    label: "DDoS Attack",
    description:
      "A flood of traffic from multiple sources is overwhelming the network.",
    severity: "high",
    healthImpact: 40,
    catnipReward: 100,
    influenceReward: 30,
    timeLimit: 30000,
    escalatesTo: null,
    fixOptions: [
      {
        label: "Enable rate limiting on Pawwall and take target offline",
        correct: true,
        feedback: "Attack mitigated. Rate limiting is holding the flood back.",
      },
      {
        label: "Restart the affected device",
        correct: false,
        feedback: "It came back online and is immediately overwhelmed again.",
      },
      {
        label: "Increase Catnip Cloud capacity",
        correct: false,
        feedback: "More capacity does not stop a DDoS. Still under attack.",
      },
    ],
  },
  {
    type: "catphishing-campaign",
    label: "Catphishing Campaign",
    description:
      "Suspicious messages are spreading through the network trying to steal credentials.",
    severity: "medium",
    healthImpact: 15,
    catnipReward: 60,
    influenceReward: 15,
    timeLimit: 60000,
    escalatesTo: "unauthorized-dog-access",
    fixOptions: [
      {
        label: "Identify and quarantine the message source",
        correct: true,
        feedback:
          "Source isolated. The catphishing campaign has been shut down.",
      },
      {
        label: "Restart the Purrtocol Router",
        correct: false,
        feedback:
          "The messages are still spreading. Router restart did nothing.",
      },
      {
        label: "Update MeowDNS records",
        correct: false,
        feedback: "DNS changes will not stop a social engineering attack.",
      },
    ],
  },
];
