{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "AWS CloudFormation Sample Template EC2_Instance_With_Ephemeral_Drives: Example to show how to attach ephemeral drives using EC2 block device mappings. **WARNING** This template creates an Amazon EC2 instance. You will be billed for the AWS resources used if you create a stack from this template.",
  "Parameters": {
    "AvailabilityZone": {
      "Description": "Server Availability Zone",
      "Type": "AWS::EC2::AvailabilityZone::Name",
      "ConstraintDescription": "must be the name of an availability zone."
    },
    "KeyName": {
      "Description": "Name of an existing EC2 KeyPair to enable SSH access to the web server",
      "Type": "AWS::EC2::KeyPair::KeyName",
      "ConstraintDescription": "must be the name of an existing EC2 KeyPair."
    },
    "InstanceType": {
      "Description": "WebServer EC2 instance type",
      "Type": "String",
      "Default": "t2.micro",
      "AllowedValues": [
        "t1.micro",
        "t2.nano",
        "t2.micro",
        "t2.small",
        "t2.medium",
        "t2.large",
        "m1.small",
        "m1.medium",
        "m1.large",
        "m1.xlarge",
        "m2.xlarge",
        "m2.2xlarge",
        "m2.4xlarge",
        "m3.medium",
        "m3.large",
        "m3.xlarge",
        "m3.2xlarge",
        "m4.large",
        "m4.xlarge",
        "m4.2xlarge",
        "m4.4xlarge",
        "m4.10xlarge",
        "c1.medium",
        "c1.xlarge",
        "c3.large",
        "c3.xlarge",
        "c3.2xlarge",
        "c3.4xlarge",
        "c3.8xlarge",
        "c4.large",
        "c4.xlarge",
        "c4.2xlarge",
        "c4.4xlarge",
        "c4.8xlarge",
        "g2.2xlarge",
        "g2.8xlarge",
        "r3.large",
        "r3.xlarge",
        "r3.2xlarge",
        "r3.4xlarge",
        "r3.8xlarge",
        "i2.xlarge",
        "i2.2xlarge",
        "i2.4xlarge",
        "i2.8xlarge",
        "d2.xlarge",
        "d2.2xlarge",
        "d2.4xlarge",
        "d2.8xlarge",
        "hi1.4xlarge",
        "hs1.8xlarge",
        "cr1.8xlarge",
        "cc2.8xlarge",
        "cg1.4xlarge"
      ],
      "ConstraintDescription": "must be a valid EC2 instance type."
    },
    "SSHLocation": {
      "Description": "Lockdown SSH access to the bastion host (default can be accessed from anywhere)",
      "Type": "String",
      "MinLength": "9",
      "MaxLength": "18",
      "Default": "0.0.0.0/0",
      "AllowedPattern": "(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})/(\\d{1,2})",
      "ConstraintDescription": "must be a valid CIDR range of the form x.x.x.x/x."
    }
  },
  "Mappings": {
    "AWSInstanceType2Arch": {
      "t1.micro": {
        "Arch": "PV64"
      },
      "t2.nano": {
        "Arch": "HVM64"
      },
      "t2.micro": {
        "Arch": "HVM64"
      },
      "t2.small": {
        "Arch": "HVM64"
      },
      "t2.medium": {
        "Arch": "HVM64"
      },
      "t2.large": {
        "Arch": "HVM64"
      },
      "m1.small": {
        "Arch": "PV64"
      },
      "m1.medium": {
        "Arch": "PV64"
      },
      "m1.large": {
        "Arch": "PV64"
      },
      "m1.xlarge": {
        "Arch": "PV64"
      },
      "m2.xlarge": {
        "Arch": "PV64"
      },
      "m2.2xlarge": {
        "Arch": "PV64"
      },
      "m2.4xlarge": {
        "Arch": "PV64"
      },
      "m3.medium": {
        "Arch": "HVM64"
      },
      "m3.large": {
        "Arch": "HVM64"
      },
      "m3.xlarge": {
        "Arch": "HVM64"
      },
      "m3.2xlarge": {
        "Arch": "HVM64"
      },
      "m4.large": {
        "Arch": "HVM64"
      },
      "m4.xlarge": {
        "Arch": "HVM64"
      },
      "m4.2xlarge": {
        "Arch": "HVM64"
      },
      "m4.4xlarge": {
        "Arch": "HVM64"
      },
      "m4.10xlarge": {
        "Arch": "HVM64"
      },
      "c1.medium": {
        "Arch": "PV64"
      },
      "c1.xlarge": {
        "Arch": "PV64"
      },
      "c3.large": {
        "Arch": "HVM64"
      },
      "c3.xlarge": {
        "Arch": "HVM64"
      },
      "c3.2xlarge": {
        "Arch": "HVM64"
      },
      "c3.4xlarge": {
        "Arch": "HVM64"
      },
      "c3.8xlarge": {
        "Arch": "HVM64"
      },
      "c4.large": {
        "Arch": "HVM64"
      },
      "c4.xlarge": {
        "Arch": "HVM64"
      },
      "c4.2xlarge": {
        "Arch": "HVM64"
      },
      "c4.4xlarge": {
        "Arch": "HVM64"
      },
      "c4.8xlarge": {
        "Arch": "HVM64"
      },
      "g2.2xlarge": {
        "Arch": "HVMG2"
      },
      "g2.8xlarge": {
        "Arch": "HVMG2"
      },
      "r3.large": {
        "Arch": "HVM64"
      },
      "r3.xlarge": {
        "Arch": "HVM64"
      },
      "r3.2xlarge": {
        "Arch": "HVM64"
      },
      "r3.4xlarge": {
        "Arch": "HVM64"
      },
      "r3.8xlarge": {
        "Arch": "HVM64"
      },
      "i2.xlarge": {
        "Arch": "HVM64"
      },
      "i2.2xlarge": {
        "Arch": "HVM64"
      },
      "i2.4xlarge": {
        "Arch": "HVM64"
      },
      "i2.8xlarge": {
        "Arch": "HVM64"
      },
      "d2.xlarge": {
        "Arch": "HVM64"
      },
      "d2.2xlarge": {
        "Arch": "HVM64"
      },
      "d2.4xlarge": {
        "Arch": "HVM64"
      },
      "d2.8xlarge": {
        "Arch": "HVM64"
      },
      "hi1.4xlarge": {
        "Arch": "HVM64"
      },
      "hs1.8xlarge": {
        "Arch": "HVM64"
      },
      "cr1.8xlarge": {
        "Arch": "HVM64"
      },
      "cc2.8xlarge": {
        "Arch": "HVM64"
      }
    },
    "AWSInstanceType2NATArch": {
      "t1.micro": {
        "Arch": "NATPV64"
      },
      "t2.nano": {
        "Arch": "NATHVM64"
      },
      "t2.micro": {
        "Arch": "NATHVM64"
      },
      "t2.small": {
        "Arch": "NATHVM64"
      },
      "t2.medium": {
        "Arch": "NATHVM64"
      },
      "t2.large": {
        "Arch": "NATHVM64"
      },
      "m1.small": {
        "Arch": "NATPV64"
      },
      "m1.medium": {
        "Arch": "NATPV64"
      },
      "m1.large": {
        "Arch": "NATPV64"
      },
      "m1.xlarge": {
        "Arch": "NATPV64"
      },
      "m2.xlarge": {
        "Arch": "NATPV64"
      },
      "m2.2xlarge": {
        "Arch": "NATPV64"
      },
      "m2.4xlarge": {
        "Arch": "NATPV64"
      },
      "m3.medium": {
        "Arch": "NATHVM64"
      },
      "m3.large": {
        "Arch": "NATHVM64"
      },
      "m3.xlarge": {
        "Arch": "NATHVM64"
      },
      "m3.2xlarge": {
        "Arch": "NATHVM64"
      },
      "m4.large": {
        "Arch": "NATHVM64"
      },
      "m4.xlarge": {
        "Arch": "NATHVM64"
      },
      "m4.2xlarge": {
        "Arch": "NATHVM64"
      },
      "m4.4xlarge": {
        "Arch": "NATHVM64"
      },
      "m4.10xlarge": {
        "Arch": "NATHVM64"
      },
      "c1.medium": {
        "Arch": "NATPV64"
      },
      "c1.xlarge": {
        "Arch": "NATPV64"
      },
      "c3.large": {
        "Arch": "NATHVM64"
      },
      "c3.xlarge": {
        "Arch": "NATHVM64"
      },
      "c3.2xlarge": {
        "Arch": "NATHVM64"
      },
      "c3.4xlarge": {
        "Arch": "NATHVM64"
      },
      "c3.8xlarge": {
        "Arch": "NATHVM64"
      },
      "c4.large": {
        "Arch": "NATHVM64"
      },
      "c4.xlarge": {
        "Arch": "NATHVM64"
      },
      "c4.2xlarge": {
        "Arch": "NATHVM64"
      },
      "c4.4xlarge": {
        "Arch": "NATHVM64"
      },
      "c4.8xlarge": {
        "Arch": "NATHVM64"
      },
      "g2.2xlarge": {
        "Arch": "NATHVMG2"
      },
      "g2.8xlarge": {
        "Arch": "NATHVMG2"
      },
      "r3.large": {
        "Arch": "NATHVM64"
      },
      "r3.xlarge": {
        "Arch": "NATHVM64"
      },
      "r3.2xlarge": {
        "Arch": "NATHVM64"
      },
      "r3.4xlarge": {
        "Arch": "NATHVM64"
      },
      "r3.8xlarge": {
        "Arch": "NATHVM64"
      },
      "i2.xlarge": {
        "Arch": "NATHVM64"
      },
      "i2.2xlarge": {
        "Arch": "NATHVM64"
      },
      "i2.4xlarge": {
        "Arch": "NATHVM64"
      },
      "i2.8xlarge": {
        "Arch": "NATHVM64"
      },
      "d2.xlarge": {
        "Arch": "NATHVM64"
      },
      "d2.2xlarge": {
        "Arch": "NATHVM64"
      },
      "d2.4xlarge": {
        "Arch": "NATHVM64"
      },
      "d2.8xlarge": {
        "Arch": "NATHVM64"
      },
      "hi1.4xlarge": {
        "Arch": "NATHVM64"
      },
      "hs1.8xlarge": {
        "Arch": "NATHVM64"
      },
      "cr1.8xlarge": {
        "Arch": "NATHVM64"
      },
      "cc2.8xlarge": {
        "Arch": "NATHVM64"
      }
    },
    "AWSRegionArch2AMI": {
      "us-east-1": {
        "PV64": "ami-2a69aa47",
        "HVM64": "ami-6869aa05",
        "HVMG2": "ami-648d9973"
      },
      "us-west-2": {
        "PV64": "ami-7f77b31f",
        "HVM64": "ami-7172b611",
        "HVMG2": "ami-09cd7a69"
      },
      "us-west-1": {
        "PV64": "ami-a2490dc2",
        "HVM64": "ami-31490d51",
        "HVMG2": "ami-1e5f0e7e"
      },
      "eu-west-1": {
        "PV64": "ami-4cdd453f",
        "HVM64": "ami-f9dd458a",
        "HVMG2": "ami-b4694ac7"
      },
      "eu-west-2": {
        "PV64": "NOT_SUPPORTED",
        "HVM64": "ami-886369ec",
        "HVMG2": "NOT_SUPPORTED"
      },
      "eu-central-1": {
        "PV64": "ami-6527cf0a",
        "HVM64": "ami-ea26ce85",
        "HVMG2": "ami-de5191b1"
      },
      "ap-northeast-1": {
        "PV64": "ami-3e42b65f",
        "HVM64": "ami-374db956",
        "HVMG2": "ami-df9ff4b8"
      },
      "ap-northeast-2": {
        "PV64": "NOT_SUPPORTED",
        "HVM64": "ami-2b408b45",
        "HVMG2": "NOT_SUPPORTED"
      },
      "ap-southeast-1": {
        "PV64": "ami-df9e4cbc",
        "HVM64": "ami-a59b49c6",
        "HVMG2": "ami-8d8d23ee"
      },
      "ap-southeast-2": {
        "PV64": "ami-63351d00",
        "HVM64": "ami-dc361ebf",
        "HVMG2": "ami-cbaf94a8"
      },
      "ap-south-1": {
        "PV64": "NOT_SUPPORTED",
        "HVM64": "ami-ffbdd790",
        "HVMG2": "ami-decdbab1"
      },
      "us-east-2": {
        "PV64": "NOT_SUPPORTED",
        "HVM64": "ami-f6035893",
        "HVMG2": "NOT_SUPPORTED"
      },
      "ca-central-1": {
        "PV64": "NOT_SUPPORTED",
        "HVM64": "ami-730ebd17",
        "HVMG2": "NOT_SUPPORTED"
      },
      "sa-east-1": {
        "PV64": "ami-1ad34676",
        "HVM64": "ami-6dd04501",
        "HVMG2": "NOT_SUPPORTED"
      },
      "cn-north-1": {
        "PV64": "ami-77559f1a",
        "HVM64": "ami-8e6aa0e3",
        "HVMG2": "NOT_SUPPORTED"
      }
    }
  },
  "Resources": {
    "EC2Instance": {
      "Type": "AWS::EC2::Instance",
      "Properties": {
        "AvailabilityZone": {
          "Ref": "AvailabilityZone"
        },
        "KeyName": {
          "Ref": "KeyName"
        },
        "InstanceType": {
          "Ref": "InstanceType"
        },
        "ImageId": {
          "Fn::FindInMap": [
            "AWSRegionArch2AMI",
            {
              "Ref": "AWS::Region"
            },
            {
              "Fn::FindInMap": [
                "AWSInstanceType2Arch",
                {
                  "Ref": "InstanceType"
                },
                "Arch"
              ]
            }
          ]
        },
        "SecurityGroups": [
          {
            "Ref": "EC2SecurityGroup"
          }
        ],
        "BlockDeviceMappings": [
          {
            "DeviceName": "/dev/sdc",
            "VirtualName": "ephemeral0"
          }
        ]
      },
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "d4385077-80f3-40ba-8713-261908e7ac91"
        }
      }
    },
    "EC2SecurityGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "GroupDescription": "SSH access",
        "SecurityGroupIngress": [
          {
            "IpProtocol": "tcp",
            "FromPort": "22",
            "ToPort": "22",
            "CidrIp": {
              "Ref": "SSHLocation"
            }
          },
          {
            "IpProtocol": "tcp",
            "FromPort": "1200",
            "ToPort": "1200",
            "CidrIp": "0.0.0.0/0"
          },
          {
            "IpProtocol": "tcp",
            "FromPort": "27000",
            "ToPort": "27015",
            "CidrIp": "0.0.0.0/0"
          },
          {
            "IpProtocol": "udp",
            "FromPort": "27000",
            "ToPort": "27015",
            "CidrIp": "0.0.0.0/0"
          }
        ]
      },
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "a6c6aa27-2ace-497e-a45e-70ec6388a24a"
        }
      }
    }
  },
  "Outputs": {
    "Instance": {
      "Value": {
        "Fn::GetAtt": [
          "EC2Instance",
          "PublicDnsName"
        ]
      },
      "Description": "DNS Name of the newly created EC2 instance"
    }
  },
  "Metadata": {
    "AWS::CloudFormation::Designer": {
      "a6c6aa27-2ace-497e-a45e-70ec6388a24a": {
        "size": {
          "width": 60,
          "height": 60
        },
        "position": {
          "x": 60,
          "y": 90
        },
        "z": 1,
        "embeds": []
      },
      "d4385077-80f3-40ba-8713-261908e7ac91": {
        "size": {
          "width": 60,
          "height": 60
        },
        "position": {
          "x": 180,
          "y": 90
        },
        "z": 1,
        "embeds": [],
        "ismemberof": [
          "a6c6aa27-2ace-497e-a45e-70ec6388a24a"
        ]
      }
    }
  }
}