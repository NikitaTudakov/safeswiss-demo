exports.jsonDescriptor = {
  "nested": {
    "csproto": {
      "nested": {
        "webclient": {
          "nested": {
            "WebPayload": {
              "fields": {
                "type": {
                  "rule": "required",
                  "type": "Type",
                  "id": 1
                },
                "action": {
                  "rule": "required",
                  "type": "int32",
                  "id": 2
                },
                "cryptoBox": {
                  "type": "bytes",
                  "id": 3
                },
                "publicKey": {
                  "type": "bytes",
                  "id": 4
                },
                "token": {
                  "type": "string",
                  "id": 5
                },
                "fragment": {
                  "type": "int32",
                  "id": 6
                },
                "fragmentCount": {
                  "type": "int32",
                  "id": 7
                }
              },
              "nested": {
                "Type": {
                  "values": {
                    "Event": 0,
                    "Request": 1,
                    "Reply": 2
                  }
                }
              }
            },
            "WebStateEvent": {
              "fields": {
                "state": {
                  "rule": "required",
                  "type": "int32",
                  "id": 1
                },
                "serverId": {
                  "type": "string",
                  "id": 2
                },
                "contactId": {
                  "type": "string",
                  "id": 3
                }
              }
            },
            "WebAlertEvent": {
              "fields": {
                "type": {
                  "type": "int32",
                  "id": 1
                },
                "messageId": {
                  "type": "int32",
                  "id": 2
                },
                "arg": {
                  "type": "string",
                  "id": 3
                }
              }
            },
            "WebCallEvent": {
              "fields": {
                "state": {
                  "type": "int32",
                  "id": 1
                },
                "type": {
                  "type": "int32",
                  "id": 2
                },
                "callerId": {
                  "type": "string",
                  "id": 3
                },
                "roomId": {
                  "type": "string",
                  "id": 4
                }
              }
            },
            "WebAuthEvent": {
              "fields": {
                "state": {
                  "type": "int32",
                  "id": 1
                },
                "contactId": {
                  "type": "string",
                  "id": 2
                },
                "name": {
                  "type": "string",
                  "id": 3
                },
                "email": {
                  "type": "string",
                  "id": 4
                },
                "phone": {
                  "type": "string",
                  "id": 5
                },
                "fingerprint": {
                  "type": "string",
                  "id": 6
                },
                "avatar": {
                  "type": "bytes",
                  "id": 7
                }
              }
            },
            "WebChatEvent": {
              "fields": {
                "chatId": {
                  "rule": "required",
                  "type": "int32",
                  "id": 1
                },
                "messageId": {
                  "type": "int32",
                  "id": 2
                },
                "ttl": {
                  "type": "int32",
                  "id": 3
                },
                "contactId": {
                  "type": "string",
                  "id": 4
                },
                "typing": {
                  "type": "int32",
                  "id": 5
                },
                "unread": {
                  "type": "int32",
                  "id": 6
                },
                "progress": {
                  "type": "int32",
                  "id": 7
                }
              }
            },
            "WebVerifyEvent": {
              "fields": {
                "result": {
                  "type": "int32",
                  "id": 1
                },
                "contactId": {
                  "type": "string",
                  "id": 2
                },
                "name": {
                  "type": "string",
                  "id": 3
                },
                "fingerprint": {
                  "type": "string",
                  "id": 4
                },
                "avatar": {
                  "type": "bytes",
                  "id": 5
                }
              }
            },
            "WebAvatarEvent": {
              "fields": {
                "contactId": {
                  "rule": "required",
                  "type": "string",
                  "id": 1
                },
                "avatar": {
                  "type": "bytes",
                  "id": 2
                }
              }
            },
            "WebAccountEvent": {
              "fields": {
                "result": {
                  "type": "string",
                  "id": 1
                }
              }
            },
            "WebContact": {
              "fields": {
                "contactId": {
                  "rule": "required",
                  "type": "string",
                  "id": 1
                },
                "name": {
                  "type": "string",
                  "id": 2
                },
                "avatar": {
                  "type": "bytes",
                  "id": 3
                },
                "fingerprint": {
                  "type": "string",
                  "id": 4
                },
                "chatId": {
                  "type": "int32",
                  "id": 5
                }
              }
            },
            "WebContacts": {
              "fields": {
                "contacts": {
                  "rule": "repeated",
                  "type": "WebContact",
                  "id": 1
                }
              }
            },
            "WebAccountDetails": {
              "fields": {
                "name": {
                  "type": "string",
                  "id": 3
                },
                "email": {
                  "type": "string",
                  "id": 4
                },
                "phone": {
                  "type": "string",
                  "id": 5
                },
                "avatar": {
                  "type": "bytes",
                  "id": 7
                }
              }
            },
            "WebExtra": {
              "fields": {
                "key": {
                  "rule": "required",
                  "type": "string",
                  "id": 1
                },
                "value": {
                  "rule": "required",
                  "type": "string",
                  "id": 2
                }
              }
            },
            "WebChat": {
              "fields": {
                "chatId": {
                  "type": "int32",
                  "id": 1
                },
                "users": {
                  "rule": "repeated",
                  "type": "string",
                  "id": 2
                },
                "type": {
                  "type": "int32",
                  "id": 3
                },
                "title": {
                  "type": "string",
                  "id": 4
                },
                "unread": {
                  "type": "int32",
                  "id": 5
                },
                "ttl": {
                  "type": "int32",
                  "id": 6
                },
                "muted": {
                  "type": "bool",
                  "id": 7
                },
                "draft": {
                  "type": "string",
                  "id": 8
                },
                "lastMessageType": {
                  "type": "int32",
                  "id": 9
                },
                "lastMessageUser": {
                  "type": "string",
                  "id": 10
                },
                "lastMessage": {
                  "type": "string",
                  "id": 11
                },
                "sent": {
                  "type": "bool",
                  "id": 12
                },
                "when": {
                  "type": "string",
                  "id": 13
                },
                "extra": {
                  "rule": "repeated",
                  "type": "WebExtra",
                  "id": 14
                },
                "avatar": {
                  "type": "bytes",
                  "id": 15
                }
              }
            },
            "WebChats": {
              "fields": {
                "chats": {
                  "rule": "repeated",
                  "type": "WebChat",
                  "id": 1
                }
              }
            },
            "WebMessage": {
              "fields": {
                "messageId": {
                  "rule": "required",
                  "type": "int32",
                  "id": 1
                },
                "user": {
                  "rule": "required",
                  "type": "string",
                  "id": 2
                },
                "type": {
                  "rule": "required",
                  "type": "int32",
                  "id": 3
                },
                "message": {
                  "rule": "required",
                  "type": "string",
                  "id": 4
                },
                "state": {
                  "rule": "required",
                  "type": "int32",
                  "id": 5
                },
                "ttl": {
                  "type": "int32",
                  "id": 6
                },
                "sent": {
                  "rule": "required",
                  "type": "bool",
                  "id": 7
                },
                "thumb": {
                  "type": "bytes",
                  "id": 8
                },
                "when": {
                  "rule": "required",
                  "type": "string",
                  "id": 9
                },
                "updated": {
                  "type": "string",
                  "id": 10
                },
                "extra": {
                  "rule": "repeated",
                  "type": "WebExtra",
                  "id": 11
                }
              }
            },
            "WebMessages": {
              "fields": {
                "messages": {
                  "rule": "repeated",
                  "type": "WebMessage",
                  "id": 1
                }
              }
            },
            "WebFile": {
              "fields": {
                "data": {
                  "rule": "required",
                  "type": "bytes",
                  "id": 1
                }
              }
            },
            "WebCall": {
              "fields": {
                "id": {
                  "type": "int32",
                  "id": 1
                },
                "caller": {
                  "type": "string",
                  "id": 2
                },
                "when": {
                  "type": "string",
                  "id": 3
                },
                "members": {
                  "rule": "repeated",
                  "type": "string",
                  "id": 4
                },
                "type": {
                  "type": "int32",
                  "id": 5
                },
                "unread": {
                  "type": "int32",
                  "id": 6
                },
                "duration": {
                  "type": "int32",
                  "id": 7
                }
              }
            },
            "WebCalls": {
              "fields": {
                "calls": {
                  "rule": "repeated",
                  "type": "WebCall",
                  "id": 1
                }
              }
            },
            "WebCredentials": {
              "fields": {
                "login": {
                  "rule": "required",
                  "type": "string",
                  "id": 1
                },
                "password": {
                  "rule": "required",
                  "type": "string",
                  "id": 2
                }
              }
            },
            "WebRequest": {
              "fields": {
                "chatId": {
                  "type": "int32",
                  "id": 1
                },
                "messageId": {
                  "type": "int32",
                  "id": 2
                },
                "remotely": {
                  "type": "bool",
                  "id": 3
                },
                "draft": {
                  "type": "string",
                  "id": 4
                },
                "typing": {
                  "type": "bool",
                  "id": 5
                },
                "muted": {
                  "type": "bool",
                  "id": 6
                },
                "ttl": {
                  "type": "int32",
                  "id": 7
                },
                "users": {
                  "rule": "repeated",
                  "type": "string",
                  "id": 8
                },
                "title": {
                  "type": "string",
                  "id": 9
                },
                "type": {
                  "type": "int32",
                  "id": 10
                },
                "content": {
                  "type": "string",
                  "id": 11
                },
                "file": {
                  "type": "bytes",
                  "id": 12
                },
                "thumb": {
                  "type": "bytes",
                  "id": 13
                },
                "extra": {
                  "rule": "repeated",
                  "type": "WebExtra",
                  "id": 14
                },
                "offset": {
                  "type": "int32",
                  "id": 15
                },
                "contact": {
                  "type": "WebContact",
                  "id": 16
                },
                "account": {
                  "type": "WebAccountDetails",
                  "id": 17
                },
                "credentials": {
                  "type": "WebCredentials",
                  "id": 18
                }
              }
            }
          }
        }
      }
    }
  }
}